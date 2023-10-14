from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

from comments.models import Comments
from comments.serializers import CreateCommentsSerializers, CommentsSerializers, AboutCommentsSerializers
from comments.service import Filter
from custom_user.permissions import IsStudent, IsStudentOwner
from mysite.pagination import ListPagination


# Student , Admin
class CommentsViewCreate(generics.CreateAPIView):
    queryset = Comments.objects.all()
    serializer_class = CreateCommentsSerializers
    permission_classes = [IsAdminUser | IsStudent]

    def perform_create(self, serializer):
        serializer.validated_data['student'] = self.request.user
        serializer.save()


# All
class CommentsViewList(generics.ListAPIView): # Фильтрация по курсу
    queryset = Comments.objects.all()
    serializer_class = AboutCommentsSerializers
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = Filter
    ordering_fields = ["rating"]
    permission_classes = [AllowAny]
    pagination_class = ListPagination


# Student автор коменнтария , Admin
class CommentsViewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comments.objects.all()
    serializer_class = CreateCommentsSerializers
    permission_classes = [IsAdminUser | IsStudentOwner]

