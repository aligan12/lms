from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from custom_user.permissions import IsTeacherOwner
from mysite.pagination import ListPagination

from teachers.models import Teachers
from teachers.serializers import CreateTeachersSerializers, TeachersSerializers, AboutTeachersSerializers


# Admin
class TeachersViewList(generics.ListAPIView):
    queryset = Teachers.objects.all()
    serializer_class = AboutTeachersSerializers
    permission_classes = [IsAdminUser]
    pagination_class = ListPagination


# Authorized
class TeachersViewRetrieve(generics.RetrieveAPIView):  # Вся инфа про учителя
    queryset = Teachers.objects.all()
    serializer_class = TeachersSerializers
    permission_classes = [IsAuthenticated]


# Admin  Teacher свой профиль
class TeachersViewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teachers.objects.all()
    serializer_class = CreateTeachersSerializers
    permission_classes = [ IsTeacherOwner]


# # Admin Teacher свой профиль
# class TeachersViewDestroy(generics.DestroyAPIView):
#     queryset = Teachers.objects.all()
#     serializer_class = CreateTeachersSerializers
#     permission_classes = [IsAdminUser | IsTeacherOwner]
