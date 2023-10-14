from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from custom_user.permissions import IsTeacherHasAccess, IsStudentHasAccess, IsTeacherHasAccessCreate, IsStudent, \
    IsStudentHasAccessCreate
from mysite.pagination import ListPagination

from test_tasks.models import TestTasks, TestQuestionAnswer, TestAnswerOptions, TestGrade
from test_tasks.serializers import TestTasksSerializers, CreateTestTasksSerializers, TestQuestionAnswerSerializers, \
    CreateTestQuestionAnswerSerializers, TestAnswerOptionsSerializers, CreateTestAnswerOptionsSerializers, \
    TestGradeSerializers, CreateTestGradeSerializers, AboutTestTasksSerializers, AboutTestQuestionAnswerSerializers, \
    AboutTestAnswerOptionsSerializers, AboutTestGradeSerializers


# Admin ,   Teacher с доступом к курсу
class TestTasksViewCreate(generics.ListCreateAPIView):
    queryset = TestTasks.objects.all()
    serializer_class = CreateTestTasksSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate]


# Admin ,  Teacher с доступом к курсу , Student проходит курс
class TestTasksViewList(generics.ListAPIView):
    queryset = TestTasks.objects.all()
    serializer_class = AboutTestTasksSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate | IsStudentHasAccessCreate]
    pagination_class = ListPagination


# Admin ,  Teacher с доступом к курсу , Student проходит курс
class TestTasksViewRetrieve(generics.RetrieveAPIView):
    queryset = TestTasks.objects.all()
    serializer_class = CreateTestTasksSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess | IsStudentHasAccess]


# Admin ,  Teacher с доступом к курсу
class TestTasksViewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = TestTasks.objects.all()
    serializer_class = TestTasksSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess]


#################################################################

# Students
class TestQuestionAnswerViewCreate(generics.ListCreateAPIView):
    queryset = TestQuestionAnswer.objects.all()
    serializer_class = CreateTestQuestionAnswerSerializers
    permission_classes = [IsStudent]


# Admin ,  Teacher с доступом к курсу
class TestQuestionAnswerViewList(generics.ListAPIView):
    queryset = TestQuestionAnswer.objects.all()
    serializer_class = AboutTestQuestionAnswerSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate ]
    pagination_class = ListPagination


# Admin ,  Teacher с доступом к курсу , Student проходит курс
class TestQuestionAnswerViewRetrieve(generics.RetrieveAPIView):
    queryset = TestQuestionAnswer.objects.all()
    serializer_class = TestQuestionAnswerSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess | IsStudentHasAccess]


# Admin , Teacher с доступом к курсу
class TestQuestionAnswerViewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = TestQuestionAnswer.objects.all()
    serializer_class = CreateTestQuestionAnswerSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess]


# class AllTestQuestionAnswerView(generics.CreateAPIView):
#     queryset = TestQuestionAnswer.objects.all()
#     serializer_class = TestQuestionAnswerSerializers

#################################################################

# Admin ,  Teacher с доступом к курсу
class TestAnswerOptionsViewAllCreate(generics.ListCreateAPIView):
    queryset = TestAnswerOptions.objects.all()
    serializer_class = CreateTestAnswerOptionsSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate]


# Admin ,  Teacher с доступом к курсу , Student проходит курс
class TestAnswerOptionsViewList(generics.ListAPIView):
    queryset = TestAnswerOptions.objects.all()
    serializer_class = AboutTestAnswerOptionsSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate | IsStudentHasAccessCreate]
    pagination_class = ListPagination


# Admin ,  Teacher с доступом к курсу , Student проходит курс
class TestAnswerOptionsViewRetrieve(generics.RetrieveAPIView):
    queryset = TestAnswerOptions.objects.all()
    serializer_class = TestAnswerOptionsSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess | IsStudentHasAccess]


# Admin ,  Teacher с доступом к курсу
class TestAnswerOptionsViewUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = TestAnswerOptions.objects.all()
    serializer_class = CreateTestAnswerOptionsSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess]


# class AllTestAnswerOptionsView(generics.CreateAPIView):
#     queryset = TestAnswerOptions.objects.all()
#     serializer_class = TestAnswerOptionsSerializers

#################################################################

#  Student в конце теста
class TestGradeViewCreate(generics.CreateAPIView):
    queryset = TestGrade.objects.all()
    serializer_class = CreateTestGradeSerializers
    permission_classes = [ IsStudentHasAccessCreate]

    def perform_create(self, serializer):
        serializer.validated_data['student'] = self.request.user
        serializer.save()


# Admin ,  Teacher с доступом к курсу
class TestGradeViewList(generics.ListAPIView): # Оценки всех студентов проходивших этот тест
    queryset = TestGrade.objects.all()
    serializer_class = AboutTestGradeSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate]
    pagination_class = ListPagination


# Admin ,  TTeacher с доступом к курсу , Student прошедший  тест
class TestGradeViewRetrieve(generics.RetrieveAPIView):
    queryset = TestGrade.objects.all()
    serializer_class = TestGradeSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess | IsStudentHasAccess]


# Admin , Teacher с доступом к курсу
class TestGradeViewRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = TestGrade.objects.all()
    serializer_class = CreateTestGradeSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess]

# class AllTestGradeView(generics.CreateAPIView):
#     queryset = TestGrade.objects.all()
#     serializer_class = TestGradeSerializers
