from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import MultiPartParser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token 
import io
from .utils import translateGG, speech2text,translate, summarizer,summariseForYoutube
from pydub import AudioSegment
import time
import os
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from datetime import datetime as dt
from django.shortcuts import render,redirect
from django.urls import reverse_lazy
from django.views.generic.edit import FormView
from django.contrib.auth.views import LoginView,PasswordChangeView
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login,logout
from django.contrib.auth.hashers import make_password
from django.utils.decorators import method_decorator
from .forms import RegisterForm,LoginForm,PasswordChangeForm1
from .models import RecordUser, RecordSpeechText, ChatbotLink
import tempfile 

def get_home(request):
    context = {}
    context['token'] = request.session.get('token', '')
    return render(request, 'home.html',context)

def get_contact(request):
    return render(request, 'contact.html')

def get_teams(request):
    return render(request, 'teams.html')
    
def login_required_if_authenticated(view_func):
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated:
            return login_required(view_func)(request, *args, **kwargs)
        else:
            return view_func(request, *args, **kwargs)
    return _wrapped_view


def redirect_authenticated_user(view_func):
    def _wrapped_view(request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('home')  
        else:
            return view_func(request, *args, **kwargs)
    return _wrapped_view

@method_decorator(redirect_authenticated_user, name='dispatch')
class RegisterView(FormView):
    template_name = 'account/sign_up.html'
    form_class = RegisterForm
    # success_url = reverse_lazy('login')

    def form_valid(self, form):
        user = form.save(commit=False)
        user.password = make_password(form.cleaned_data['password'])
        user.save()
        username = user.username
        messages.success(self.request, f'Account created for {username}')
        return super().form_valid(form)
    
    def get_success_url(self):
        return reverse_lazy('login')

class LoginView(LoginView):
    template_name = 'account/login.html'
    fields = '__all__'
    redirect_authenticated_user = True
    authentication_form = LoginForm
    # success_url = reverse_lazy('home')
    def form_valid(self, form):
        login(self.request, form.get_user())
        if not form.cleaned_data.get('remember_me'):
            self.request.session.set_expiry(0)  
        token, _ = Token.objects.get_or_create(user=self.request.user)
        self.request.session['token'] = token.key
        return super().form_valid(form)
    
    @method_decorator(login_required_if_authenticated)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def get_success_url(self):
        return reverse_lazy('home')
from django.views import View

class LogoutView(View):
    def get(self, request, *args, **kwargs):
        if 'token' in self.request.session:
            self.request.session['token'] = 'None'
        logout(request)
        return redirect('home')
    
class ChangePasswordView(LoginRequiredMixin, PasswordChangeView):
    template_name = 'account/change_password.html'
    form_class = PasswordChangeForm1
    # success_url = reverse_lazy('home')

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs['user'] = self.request.user
        return kwargs

    def form_valid(self, form):
        form.save()
        return super().form_valid(form)
    def get_success_url(self):
        return reverse_lazy('home')


class AudioAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    parser_classes = (MultiPartParser,)
    def post(self, request, session_record=1, lang='vi'): 
        start_time = time.time()
        video_file = request.FILES.get('video')
        timestamp = int(dt.today().timestamp())

        if video_file: 
            # Lưu video tạm thời
            with tempfile.NamedTemporaryFile(suffix='.webm', delete=False) as temp_file:
                for chunk in video_file.chunks():
                    temp_file.write(chunk)
                temp_file.flush()
            temp_file_path = temp_file.name   
            try:
                audio = AudioSegment.from_file(temp_file_path, format="webm") 
            except:
                return Response({"translate": "oke"})
            
            audio_duration = int(len(audio) / 1000)

            buffer = io.BytesIO()
            buffer.name = f"{timestamp}.mp3"
            audio.export(buffer, format="mp3")
            with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as temp_file_mp3:
                temp_file_mp3.write(buffer.getvalue())    
            time_process_read_file  = time.time() - start_time
            start_time = time.time()
            try:
                text = speech2text(buffer).strip() 
            except:
                return Response({"translate": "oke"})
            
            time_process = time.time() - start_time
            start_time = time.time()
            record_user = RecordUser.objects.filter(record_id=session_record).first()

            if record_user is None:
                translate_text = translate(text, target_language = lang)
                record_user = RecordUser.objects.create(
                    record_id = session_record, 
                    username=request.user, 
                    summary_text=translate_text, 
                    time_used=audio_duration
                )
            else:
                add_text_old = record_user.summary_text
                record_user.summary_text =  text
                
                text =  add_text_old + " " + text
                
                translate_text = translate(text, target_language = lang)
                
                record_user.time_used += audio_duration
                
            record_speech_text = RecordSpeechText.objects.create(
                record_id=record_user, 
                audio=buffer.getvalue(), 
                duration=audio_duration, 
                text_english=text, 
                text_translate=translate_text, 
                lang = lang
            )
            
            record_speech_text.save()
            record_user.save()
            os.remove(temp_file_path)
            os.remove(temp_file_mp3.name)

            print("streaming audio")
            
            return Response({"translate": translate_text, 
                            "time_store_database": round(time.time() - start_time, 3), 
                            "time_process": time_process, 
                            "time_process_read_file": time_process_read_file, 
                            "session_record": session_record, 
                            "lang": lang
                            }, status=status.HTTP_201_CREATED)
  
        else:
            return Response({"error": "No video file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

class summarizerAudioAPI(APIView): 
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print("summarise")
        text = summarizer(request.data.get('text', ''))
        return Response({"text": text}, status=status.HTTP_200_OK)

class summarizerYoutube(APIView): 
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print("summarise Youtube")
        text = summariseForYoutube(request.data.get('text', ''))
        return Response({"text": text}, status=status.HTTP_200_OK)

from .utils import  chat
class chatAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated] 
    def post(self, request):
        print("message") 
        message = chat(request.data.get('message', ''))
        return Response({'message': message}, status=status.HTTP_200_OK)


class UploadFileAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        file = request.FILES.get('file')
        if file:
            old_links = ChatbotLink.objects.filter(username=request.user)
            for old_link in old_links:
                if os.path.exists(old_link.link):
                    os.remove(old_link.link)
                old_link.delete()
            

            with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as temp_file:
                for chunk in file.chunks():
                    temp_file.write(chunk)
                temp_file.flush()
            print(temp_file.name)
            link = ChatbotLink.objects.create(link_id=temp_file.name, 
                                              username=request.user, 
                                              link=temp_file.name,
                                              created_at=dt.now())
            link.save()

            return Response({"file": temp_file.name}, status=status.HTTP_200_OK)
        else:

            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

from .rag import process_pdf_and_ask_question
from asgiref.sync import async_to_sync
class RagChatAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        question = request.data.get('message', '')
        links = ChatbotLink.objects.filter(username=request.user)
        first_link = links.first().link
        print("first_link: ", first_link)
        
        start_time = time.time()
        message = process_pdf_and_ask_question(first_link, question) 
        print("time_process", time.time() - start_time)
        
        return Response({'message': message}, status=status.HTTP_200_OK)