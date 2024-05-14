from langchain.vectorstores import Chroma
from langchain.embeddings.openai import OpenAIEmbeddings 
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter 
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from pathlib import Path
import os
import pickle 
import asyncio
from aiofiles import open as aio_open
import aiofiles
from concurrent.futures import ThreadPoolExecutor
os.environ["OPENAI_API_KEY"] = "My_API_Key"

async def split_documents_async(text_splitter, docs):
    loop = asyncio.get_event_loop()
    with ThreadPoolExecutor() as executor:
        futures = [loop.run_in_executor(executor, text_splitter.split_documents, doc) for doc in docs]
        result = await asyncio.gather(*futures)
    return [chunk for sublist in result for chunk in sublist]

async def process_pdf_and_ask_question(pdf_path, question, chunk_size=500, chunk_overlap=150, separator='. ', temperature=0.7, model_name="gpt-4", cache_dir="cache"):
    if not Path(pdf_path).is_file():
        raise FileNotFoundError(f"File {pdf_path} không tồn tại.")
    
    # Tạo thư mục cache nếu chưa tồn tại
    if not os.path.exists(cache_dir):
        os.makedirs(cache_dir)
    
    cache_file = os.path.join(cache_dir, f"{os.path.basename(pdf_path)}.pkl")
    
    # Kiểm tra xem đã có cache hay chưa
    if os.path.exists(cache_file):
        async with aiofiles.open(cache_file, 'rb') as f:
            data = await f.read()
            chunks = pickle.loads(data)
    else:
        loader = PyPDFLoader(pdf_path)
        docs = loader.load()
        
        text_splitter = CharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separator=separator
        )

        # Sử dụng bất đồng bộ để chia nhỏ tài liệu
        chunks = await split_documents_async(text_splitter, docs)
         
        async with aiofiles.open(cache_file, 'wb') as f:
            await f.write(pickle.dumps(chunks))

    embedding = OpenAIEmbeddings()
    vectordb = Chroma.from_documents(
        documents=chunks,
        embedding=embedding,
    )
    
    llm = ChatOpenAI(temperature=temperature, model_name=model_name)
    qa_chain = RetrievalQA.from_chain_type(
        llm,
        retriever=vectordb.as_retriever(search_type="mmr"),
        return_source_documents=True,
        chain_type="refine"
    )
    
    result = qa_chain({"query": question})
    return result['result']