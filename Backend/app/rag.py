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

def process_pdf_and_ask_question(pdf_path, question, chunk_size=1000, chunk_overlap=100, separator='. ', temperature=0.9, model_name="gpt-4"):
    if not Path(pdf_path).is_file():
        raise FileNotFoundError(f"File {pdf_path} không tồn tại.")
 
    loader = PyPDFLoader(pdf_path)
    docs = loader.load() 
 
    text_splitter = CharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        separator=separator
    )
    chunks = text_splitter.split_documents(docs)
 
    embedding = OpenAIEmbeddings()
    vectordb = Chroma.from_documents(
        documents=chunks,
        embedding=embedding,
    )
 
    llm = ChatOpenAI(temperature=temperature, model_name=model_name)
    
    retriever = vectordb.as_retriever(
        search_type="similarity", search_kwargs={"k": 3}
    )
    qa_chain = RetrievalQA.from_chain_type(
        llm,
        retriever=retriever,
        return_source_documents=True,
        chain_type="refine",
        verbose=True
    )
 
    result = qa_chain({"query": question})
    return result['result']