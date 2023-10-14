
from djoser.serializers import UserSerializer, UserCreateSerializer

from custom_user.models import User


class CreateCustomUserSerializer(UserCreateSerializer):
    class Meta:
        model = User
        fields = ['email', 'id']


class CustomUserSerializer(UserCreateSerializer):
    class Meta:
        model = User
        fields = [ 'avatar','phone']
