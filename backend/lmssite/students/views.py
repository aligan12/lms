from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.
from rest_framework import generics
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from custom_user.permissions import IsTeacherHasAccess, IsStudentOwner, IsTeacherHasAccessCreate, IsTeacher, \
    IsTeacherOwnerForList, IsStudentOwnerForList, IsStudent
from mysite.pagination import ListPagination

from students.models import Students, CourseStudent
from students.serializers import StudentsSerializers, CreateStudentsSerializers, AboutStudentsSerializers, \
    CourseStudentSerializers, OnlyCoursesStudentSerializers
from students.service import Filter


# Admin  Teacher
class StudentsViewAll(generics.ListAPIView):  # Вообще все студенты
    queryset = Students.objects.all()
    serializer_class = AboutStudentsSerializers
    permission_classes = [IsAdminUser | IsTeacher]
    pagination_class = ListPagination
    filter_backends = (SearchFilter,)
    search_fields = ['name', 'surname', 'patronymic']

# Authorized
class StudentsViewRetrieve(generics.RetrieveAPIView):
    queryset = Students.objects.all()
    serializer_class = StudentsSerializers
    permission_classes = [IsAuthenticated]


#  Student свой курсы
class OnlyCoursesStudentViewRetrieve(generics.RetrieveAPIView):
    queryset = Students.objects.all()
    serializer_class = OnlyCoursesStudentSerializers
    permission_classes = [IsStudentOwner]


# Admin ,  Student свой профиль
class StudentsViewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Students.objects.all()
    serializer_class = CreateStudentsSerializers
    permission_classes = [IsStudentOwner]




# Admin
class CourseStudentViewCreate(generics.CreateAPIView):
    queryset = CourseStudent.objects.all()
    serializer_class = CourseStudentSerializers
    permission_classes = [IsAdminUser | IsStudent]


# Admin , Teacher имеющий доступ , Student имеющий доступ
class CourseStudentViewAll(generics.ListAPIView):
    queryset = CourseStudent.objects.all()
    serializer_class = CourseStudentSerializers
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filterset_class = Filter
    permission_classes = [IsAdminUser | IsTeacherOwnerForList | IsStudentOwnerForList]
    pagination_class = ListPagination
    search_fields = ['student', 'course']
