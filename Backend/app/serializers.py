
from rest_framework import serializers

from app.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserClients
        fields =['username', 'full_name', 'created_at' ,'email' ,'usage' ,'number_phone' ]
# class EventsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Events
#         fields = '__all__'