from django.shortcuts import render

from djoser.views import UserViewSet


# Djoser activations view
from rest_framework import status, generics
from rest_framework.response import Response

from custom_user.models import User
from custom_user.permissions import IsOwner
from custom_user.serializers import CustomUserSerializer


class ActivateUser(UserViewSet):
    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs.setdefault('context', self.get_serializer_context())

        # this line is the only change from the base implementation.
        kwargs['data'] = {"uid": self.kwargs['uid'], "token": self.kwargs['token']}

        return serializer_class(*args, **kwargs)

    def activation(self, request, uid, token, *args, **kwargs):
        super().activation(request, *args, **kwargs)
        return Response(status=status.HTTP_204_NO_CONTENT)


class CustomUserViewUpdate(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class =CustomUserSerializer
    permission_classes = [IsOwner]


