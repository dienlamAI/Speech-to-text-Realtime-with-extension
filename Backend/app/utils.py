from openai import OpenAI
from google.cloud import translate_v2 as translate

import time

from faster_whisper import WhisperModel
model_size = "tiny"
print('oke')
model = WhisperModel(model_size, device="cpu", compute_type="int8")
# client = OpenAI(api_key="My_API_Key")

# my_key
client = OpenAI(api_key='My_API_Key')

#  google translate
clientGG = translate.Client()
def translateGG(text, target_language="vi"):
    result = clientGG.translate(text, target_language=target_language)
    return result['translatedText']
    
# def speech2text(audio_file):
#     # transcript = client.audio.transcriptions.create(
#     #     model="whisper-1", 
#     #     file=audio_file, 
#     #     response_format = "text"
#     # )
#     segments, info = model.transcribe(audio_file)
#     transcript = ""
#     for segment in segments:
#         transcript+= segment.text
#     return transcript
def text_proofreading(text):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        max_tokens=2000,
        messages=[
            {
                "role": "system",
                "content": "Please proofread. Please return only the proofreading results.",
            },
            {"role": "user", "content": text},
        ],
    )
    return response.choices[0].message.content

def speech2text(audio_file):
    # audio_file= open(audio_file, "rb")
    transcript = client.audio.translations.create(
        model="whisper-1", 
        file=audio_file, 
        response_format = "text"
    )
    return transcript

def translate(content, target_language = 'Vietnamese'):

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages= [
            {
            "role": "system",
            "content": f"You will be provided with a sentence in English, and your task is to translate it into {target_language}. If it's too short, just translate it, or return it blank"
            },
            {
            "role": "user",
            "content": content
            }
        ],
        temperature=0.7,
        max_tokens=100,
        top_p=1
    )
    
    return response.choices[0].message.content
def summarizer(content, target_language = 'Vietnamese'):
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
            "role": "system",
            "content": f"You will be provided with meeting notes by language {target_language }, and your task is to summarize the meeting as follows:\n    \n    -Overall summary of discussion\n    -Action items (what needs to be done and who is doing it)\n    -If applicable, a list of topics that need to be discussed more fully in the next meeting."
            },
            {
            "role": "user",
            "content": content
            }
        ],
        temperature=0.7,
        max_tokens=64,
        top_p=1
        
    )
    return response.choices[0].message.content

# Summarise for youtube
def summariseForYoutube(content, target_language = 'Vietnamese'):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[ 
            {
            "role": "user",
            "content": content
            }
        ],
        temperature=0.7,
        max_tokens=1500,
        top_p=1
        
    )
    return response.choices[0].message.content

def chat(content):
    response = client.chat.completions.create(
        model="gpt-4-0125-preview",
        messages=[
            {
            "role": "user",
            "content": content
            }
        ],
        temperature=0.7,
        max_tokens=1000,
        top_p=1
    )
    return response.choices[0].message.content