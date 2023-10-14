from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from custom_user.permissions import IsTeacherHasAccess, IsStudentHasAccess, IsStudentOwner, IsTeacherHasAccessCreate, \
    IsStudentHasAccessCreate
from file_tasks.models import FileTasks, FileTasksAnswer, FileTasksGrade
from file_tasks.serializers import CreateFileTasksSerializers, CreateFileTasksGradeSerializers, \
    CreateFileTasksAnswerSerializers, FileTasksSerializers, FileTasksAnswerSerializers, FileTasksGradeSerializers, \
    AboutFileTasksSerializers, AboutFileTasksGradeSerializers, AboutFileTasksAnswerSerializers
from file_tasks.service import Filter
from mysite.pagination import ListPagination


######################################################################################################

# Admin , Teacher с доступом к курсу

class FileTasksViewCreate(generics.CreateAPIView):
    queryset = FileTasks.objects.all()
    serializer_class = CreateFileTasksSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate]


# Admin
class FileTasksViewList(generics.ListAPIView):
    queryset = FileTasks.objects.all()
    serializer_class = AboutFileTasksSerializers
    permission_classes = [IsAdminUser]
    pagination_class = ListPagination


# Admin , Teacher с доступом к курсу  , Student ученик курса
class FileTasksViewRetrieve(generics.RetrieveAPIView):
    queryset = FileTasks.objects.all()
    serializer_class = FileTasksSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess | IsStudentHasAccess]


# Admin , Teacher с доступом к курсу
class FileTasksViewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = FileTasks.objects.all()
    serializer_class = CreateFileTasksSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess]


######################################################################################################

# Admin , Teacher с доступом к курсу
class FileTasksGradeViewCreate(generics.CreateAPIView):
    queryset = FileTasksGrade.objects.all()
    serializer_class = CreateFileTasksGradeSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate]


# Admin , Teacher с доступом к курсу
class FileTasksGradeViewList(generics.ListAPIView):  # оценки всех учеников
    queryset = FileTasksGrade.objects.all()
    serializer_class = AboutFileTasksGradeSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate]
    pagination_class = ListPagination


# Admin , Teacher с доступом к курсу , student выполневший задания
class FileTasksGradeViewRetrieve(generics.RetrieveAPIView):
    queryset = FileTasksGrade.objects.all()
    serializer_class = FileTasksGradeSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess | IsStudentOwner]


# Admin , Teacher с доступом к курсу
class FileTasksGradeViewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = FileTasksGrade.objects.all()
    serializer_class = CreateFileTasksGradeSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess]


######################################################################################################

# Student который проходит курс
class FileTasksAnswerViewCreate(generics.CreateAPIView):
    queryset = FileTasksAnswer.objects.all()
    serializer_class = CreateFileTasksAnswerSerializers
    permission_classes = [IsStudentHasAccessCreate]

    def perform_create(self, serializer):
        if bool(self.request.user and self.request.user.is_authenticated):
            serializer.validated_data['student'] = self.request.user
            serializer.save()


# Admin , Teacher с доступом к курсу
class FileTasksAnswerViewList(generics.ListAPIView):  # фильтрация по курсу и по заданию
    queryset = FileTasksAnswer.objects.all()
    serializer_class = AboutFileTasksAnswerSerializers
    filter_backends = (DjangoFilterBackend,)
    filterset_class = Filter
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate| IsStudentHasAccessCreate]
    pagination_class = ListPagination


# Admin , Teacher с доступом к курсу  ,Student автор ответа
class FileTasksAnswerViewRetrieve(generics.RetrieveAPIView):
    queryset = FileTasksAnswer.objects.all()
    serializer_class = FileTasksAnswerSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess | IsStudentOwner]


# Student автор ответа
class FileTasksAnswerViewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = FileTasksAnswer.objects.all()
    serializer_class = CreateFileTasksAnswerSerializers
    permission_classes = [IsStudentOwner]

######################################################################################################
