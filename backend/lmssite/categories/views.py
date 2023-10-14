from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, AllowAny

from categories.models import Category
from categories.serializers import CategorySerializers, CreateCategorySerializers, AboutCategorySerializers
from mysite.pagination import ListPagination


# Admin
class CategoriesViewCreate(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CreateCategorySerializers
    permission_classes = [IsAdminUser]


# All
class CategoriesViewList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = AboutCategorySerializers
    permission_classes = [AllowAny]
    pagination_class = ListPagination


# All
class CategoriesViewRetrieve(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers
    permission_classes = [AllowAny]


# Admin
class CategoriesViewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CreateCategorySerializers
    permission_classes = [IsAdminUser]

