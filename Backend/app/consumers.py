import json
from channels.generic.websocket import AsyncWebsocketConsumer 
 
from rest_framework.response import Response 
import io
from .utils import translateGG, speech2text,translate 
from pydub import AudioSegment
import time
import os 
from datetime import datetime as dt  
import tempfile 

temp_audio_list = []
def addAudio(temp_audio,timestamp):
    global temp_audio_list
    if len(temp_audio_list) == 0:
        temp_audio_list.append(temp_audio)
    elif len(temp_audio_list) > 3:
        for audio in temp_audio_list[:-1]:
            os.remove(audio)
        temp_audio_list.clear()
        temp_audio_list.append(temp_audio)
    else:
        lastChild = temp_audio_list[-1]
        audio1 = AudioSegment.from_file(lastChild)
        audio2 = AudioSegment.from_file(temp_audio)
        combined = audio1 + audio2
        buffer = io.BytesIO()
        buffer.name = f"{timestamp}.mp3"
        combined.export(buffer, format="mp3")
        with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as temp_file_mp3:
            temp_file_mp3.write(buffer.getvalue()) 
        temp_audio_list.append(temp_file_mp3.name)
        os.remove(temp_audio)
 
 
        

class Audio(AsyncWebsocketConsumer):
    async def connect(self): 
        print("Connected to websocket")
        await self.accept()

        # await self.send(text_data=json.dumps({
        #     'message': "Connected to websocket"
        # }))

    async def disconnect(self, close_code): 
        await self.close()

    async def receive(self, bytes_data,text_data=None, **kwargs):
        global temp_file_path  
        print("receive") 

        timestamp = int(dt.today().timestamp())
        with tempfile.NamedTemporaryFile(suffix='.webm', delete=False) as temp_file:
                temp_file.write(bytes_data) 
        temp_file_path = temp_file.name  
 
        try:
            audio = AudioSegment.from_file(temp_file_path, format="webm") 
        except:
            print("error audio")
            

        buffer = io.BytesIO()
        buffer.name = f"{timestamp}.mp3"
        audio.export(buffer, format="mp3")
        with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as temp_file_mp3:
            temp_file_mp3.write(buffer.getvalue())     
        start_time = time.time()
        # addAudio(temp_file_mp3.name,timestamp) 
        try:
            # text = speech2text(temp_audio_list[-1]).strip()
            text = speech2text(buffer).strip()
            print(text)
        except:
            print("error speech2text")
            
            
            
        
        translate_text = translate(text, target_language = "vi")
        print(translate_text) 
                
        os.remove(temp_file_path) 

        end_time = time.time()
         
        print("streaming audio")
        
        await self.send(text_data=json.dumps({
            'text': translate_text,
            'time': end_time - start_time
        }))
        