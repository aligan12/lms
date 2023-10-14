from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny

from custom_user.permissions import IsStudent, IsStudentOwnerForList, IsStudentOwner, IsTeacher, IsTeacherOwnerForList, \
    IsTeacherOwner, IsSuperAdmin, IsAdminOwner, IsAdminOwnerForList
from mysite.pagination import ListPagination
from support_chat.models import StudentTickets, TeacherTickets, AdminTickets, UnauthorizedTickets
from support_chat.serializers import CreateStudentTicketsSerializers, AboutStudentTicketsSerializers, \
    StudentTicketsSerializers, TeacherTicketsSerializers, CreateTeacherTicketsSerializers, \
    CreateAdminTicketsSerializers, AboutAdminTicketsSerializers, AdminTicketsSerializers, \
    AboutTeacherTicketsSerializers, CreateUnauthorizedTicketsSerializers, AboutUnauthorizedTicketsSerializers, \
    UnauthorizedTicketsSerializers
from support_chat.service import FilterForStudents, FilterForTeachers, FilterForAdmins


# Student
class StudentTicketsViewCreate(generics.CreateAPIView):
    queryset = StudentTickets.objects.all()
    serializer_class = CreateStudentTicketsSerializers
    permission_classes = [IsStudent]

    def perform_create(self, serializer):
        serializer.validated_data['student'] = self.request.user
        serializer.save()


# Admin
class StudentTicketsViewList(generics.ListAPIView):  # всех студентов
    queryset = StudentTickets.objects.all()
    serializer_class = AboutStudentTicketsSerializers
    permission_classes = [IsAdminUser]
    pagination_class = ListPagination


# Admin  , Student автор
class OnlyOneStudentTicketsViewList(generics.ListAPIView):  # все тикеты одного студента
    queryset = StudentTickets.objects.all()
    serializer_class = AboutStudentTicketsSerializers
    filter_backends = (DjangoFilterBackend,)
    filterset_class = FilterForStudents
    permission_classes = [IsAdminUser | IsStudentOwnerForList]
    pagination_class = ListPagination


# Admin  , Student автор
class StudentTicketsViewRetrieve(generics.RetrieveAPIView):
    queryset = StudentTickets.objects.all()
    serializer_class = StudentTicketsSerializers
    permission_classes = [IsAdminUser | IsStudentOwner]


# Admin  , Student автор
class StudentTicketsViewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = StudentTickets.objects.all()
    serializer_class = CreateTeacherTicketsSerializers
    permission_classes = [IsAdminUser | IsStudentOwner]


################################################################################################

# Teacher

class TeacherTicketsViewCreate(generics.CreateAPIView):
    queryset = TeacherTickets.objects.all()
    serializer_class = CreateTeacherTicketsSerializers
    permission_classes = [IsTeacher]

    def perform_create(self, serializer):
        serializer.validated_data['teacher'] = self.request.user
        serializer.save()


# Admin
class TeacherTicketsViewList(generics.ListAPIView):  # всех учителей
    queryset = TeacherTickets.objects.all()
    serializer_class = AboutTeacherTicketsSerializers
    permission_classes = [IsAdminUser]
    pagination_class = ListPagination


# Admin , Teacher автор
class OnlyOneTeacherTicketsViewList(generics.ListAPIView):  # все тикеты одного учителя
    queryset = TeacherTickets.objects.all()
    serializer_class = AboutTeacherTicketsSerializers
    filter_backends = (DjangoFilterBackend,)
    filterset_class = FilterForTeachers
    permission_classes = [IsAdminUser | IsTeacherOwnerForList]
    pagination_class = ListPagination


# Admin , Teacher автор
class TeacherTicketsViewRetrieve(generics.RetrieveAPIView):
    queryset = TeacherTickets.objects.all()
    serializer_class = TeacherTicketsSerializers
    permission_classes = [IsAdminUser | IsTeacherOwner]


# Admin , Teacher автор
class TeacherTicketsViewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = TeacherTickets.objects.all()
    serializer_class = CreateTeacherTicketsSerializers
    permission_classes = [IsAdminUser | IsTeacherOwner]


#####################################################################################################

# Admin
class AdminTicketsViewCreate(generics.CreateAPIView):
    queryset = AdminTickets.objects.all()
    serializer_class = CreateAdminTicketsSerializers
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        serializer.validated_data['user'] = self.request.user
        serializer.save()


# Super Admin
class AdminTicketsViewList(generics.ListAPIView):  # всех Админов
    queryset = AdminTickets.objects.all()
    serializer_class = AboutAdminTicketsSerializers
    permission_classes = [IsSuperAdmin]
    pagination_class = ListPagination


# Super Admin , Admin автор
class OnlyOneAdminTicketsViewList(generics.ListAPIView):  # все тикеты одного админа
    queryset = AdminTickets.objects.all()
    serializer_class = AboutAdminTicketsSerializers
    filter_backends = (DjangoFilterBackend,)
    filterset_class = FilterForAdmins
    permission_classes = [IsSuperAdmin | IsAdminOwnerForList]
    pagination_class = ListPagination


# Super Admin , Admin автор
class AdminTicketsViewRetrieve(generics.RetrieveAPIView):
    queryset = AdminTickets.objects.all()
    serializer_class = AdminTicketsSerializers
    permission_classes = [IsSuperAdmin | IsAdminOwner]


# Super Admin , Admin автор
class AdminTicketsViewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = AdminTickets.objects.all()
    serializer_class = CreateAdminTicketsSerializers
    permission_classes = [IsSuperAdmin | IsAdminOwner]


#####################################################################################################
# All
class UnauthorizedTicketsViewCreate(generics.CreateAPIView):
    queryset = UnauthorizedTickets.objects.all()
    serializer_class = CreateUnauthorizedTicketsSerializers
    permission_classes = [AllowAny]


# Admin
class UnauthorizedTicketsViewList(generics.ListAPIView):
    queryset = UnauthorizedTickets.objects.all()
    serializer_class = AboutUnauthorizedTicketsSerializers
    permission_classes = [IsAdminUser]
    pagination_class = ListPagination


# Admin
class UnauthorizedTicketsViewRetrieve(generics.RetrieveAPIView):
    queryset = UnauthorizedTickets.objects.all()
    serializer_class = UnauthorizedTicketsSerializers
    permission_classes = [IsAdminUser]


# Admin
class UnauthorizedTicketsViewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = UnauthorizedTickets.objects.all()
    serializer_class = CreateUnauthorizedTicketsSerializers
    permission_classes = [IsAdminUser]
