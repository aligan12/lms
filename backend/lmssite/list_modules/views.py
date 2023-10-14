from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.
from rest_framework import generics
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from custom_user.permissions import IsTeacherHasAccess, IsStudentHasAccess, IsTeacherHasAccessCreate, \
    IsStudentHasAccessCreate
from list_modules.models import ListModules, Modules
from list_modules.serializers import ListModulesSerializers, CreateListModulesSerializers, AboutListModulesSerializers, \
    CreateModulesSerializers, ModulesSerializers, OnlyTaskListModulesSerializers

from list_modules.service import Filter, FilterForModules
from mysite.pagination import ListPagination


# Admin , Teacher с доступом к курсу
class ListModulesViewCreate(generics.CreateAPIView):
    queryset = ListModules.objects.all()
    serializer_class = CreateListModulesSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate]


# Admin , Teacher с доступом к курсу, Student которые проходят этот курс
class ListModulesViewList(generics.ListAPIView):  # все модули курса
    queryset = ListModules.objects.all()
    serializer_class = AboutListModulesSerializers
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = Filter
    ordering_fields = ["number"]
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate | IsStudentHasAccessCreate]
    pagination_class = ListPagination


# Admin , Teacher с доступом к курсу, Student которые проходят этот курс
class OnlyTasksListModulesViewList(generics.ListAPIView): #только задания
    queryset = ListModules.objects.all()
    serializer_class = OnlyTaskListModulesSerializers

    def get_queryset(self):
        queryset = ListModules.objects.all()
        queryset = queryset.filter(module_type__in=['2', '3'])
        return queryset

    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = Filter
    ordering_fields = ["number"]
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate | IsStudentHasAccessCreate]
    pagination_class = ListPagination


# Admin , Teacher с доступом к курсу, Student которые проходят этот курс
class ListModulesViewRetrieve(generics.RetrieveAPIView):
    queryset = ListModules.objects.all()
    serializer_class = ListModulesSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess | IsStudentHasAccess]


# Admin , Teacher с доступом к курсу
class ListModulesViewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = ListModules.objects.all()
    serializer_class = CreateListModulesSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess]

# Module
# Admin , Teacher с доступом к курсу
class ModulesViewCreate(generics.CreateAPIView):
    queryset = Modules.objects.all()
    serializer_class = CreateModulesSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate]




# Admin , Teacher с доступом к курсу, Student которые проходят этот курс
class ModulesViewList(generics.ListAPIView):
    queryset = Modules.objects.all()
    serializer_class = ModulesSerializers
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = FilterForModules
    ordering_fields = ["order"]
    pagination_class = ListPagination

# Admin , Teacher с доступом к курсу, Student которые проходят этот курс
class ModulesViewRetrieve(generics.RetrieveAPIView):
    queryset = Modules.objects.all()
    serializer_class = ModulesSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess | IsStudentHasAccess]

# Admin , Teacher с доступом к курсу
class ModulesViewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Modules.objects.all()
    serializer_class = CreateModulesSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess]