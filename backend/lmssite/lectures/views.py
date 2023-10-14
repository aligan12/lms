from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from custom_user.permissions import IsTeacherHasAccess, IsStudentHasAccess, IsTeacherHasAccessCreate, \
    IsStudentHasAccessCreate
from lectures.models import Lectures, Additions, LessonContent

from lectures.serializers import LecturesSerializers, CreateLecturesSerializers, AboutLecturesSerializers, \
    CreateAdditionsSerializers, CreateLessonContentSerializers
from mysite.pagination import ListPagination


# Admin , Teacher с доступом к курсу
class LecturesViewCreate(generics.CreateAPIView):
    queryset = Lectures.objects.all()
    serializer_class = CreateLecturesSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate]


# Admin , Teacher с доступом к курсу, Student которые прооходят этот курс
class LecturesViewList(generics.ListAPIView):
    queryset = Lectures.objects.all()
    serializer_class = AboutLecturesSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate | IsStudentHasAccessCreate]
    pagination_class = ListPagination


# Admin , Teacher с доступом к курсу, Student которые прооходят этот курс
class LecturesViewRetrieve(generics.RetrieveAPIView):
    queryset = Lectures.objects.all()
    serializer_class = LecturesSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess | IsStudentHasAccess]


# Admin , Teacher с доступом к курсу
class LecturesViewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lectures.objects.all()
    serializer_class = CreateLecturesSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess]


class AdditionsViewCreate(generics.CreateAPIView):
    queryset = Additions.objects.all()
    serializer_class = CreateAdditionsSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate]


class LessonContentViewCreate(generics.CreateAPIView):
    queryset = LessonContent.objects.all()
    serializer_class = CreateLessonContentSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate]