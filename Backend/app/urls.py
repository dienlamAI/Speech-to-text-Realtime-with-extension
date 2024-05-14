from django.urls import path 
from .views import *

urlpatterns = [
    # api
    path('api/audio/<str:session_record>/<str:lang>/', AudioAPI.as_view(), name="api_audio"),
    path('api/summarizer/', summarizerAudioAPI.as_view(), name="api_summarizer"),
    path('api/summarizerYoutube/', summarizerYoutube.as_view(), name="api_summarizerYoutube"),
    path('api/upload/', UploadFileAPI.as_view(), name="api_upload"),
    path('api/chat/', chatAPI.as_view(), name="api_chat"),
    path('api/rag-chat/', RagChatAPI.as_view(), name="api_rag_chat"),

    
    path('', get_home,name='home'),
    path('contact/', get_contact,name='contact'),
    path('teams/', get_teams,name='teams'),

    
    path('sign-up/', RegisterView.as_view(), name='sign_up'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
]
 