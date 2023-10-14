# grades с фильтрацией по course  , для просмотра  всех оценок студентов
from django_filters.rest_framework import DjangoFilterBackend
# grades с фильтрацией по course и студенту   , для просмотра   всех оценок определенного студента


from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from custom_user.permissions import IsStudent, IsTeacherHasAccessCreate, IsTeacherHasAccess, IsStudentOwner, \
    IsStudentOwnerForList, IsStudentHasAccessCreate
from grades.models import Grades
from grades.serializers import GradesSerializers, CreateGradesSerializers, AboutGradesSerializers, ChangeGradesForTask, \
    GradesWithStudentInfoSerializers
from grades.service import Filter, FilterOnlyCourse
from mysite.pagination import ListPagination


# Student and Admin
class AttendanceForLecturesViewCreate(generics.CreateAPIView):
    queryset = Grades.objects.all()
    serializer_class = CreateGradesSerializers
    permission_classes = [IsAdminUser | IsStudentHasAccessCreate]

    def perform_create(self, serializer):
        serializer.validated_data['student'] = self.request.user
        serializer.save()


# нужно передавать /?course=<id>
# Admin , Teacher имеющий доступ , Student свои оценки
class GradesOneStudentViewList(generics.ListAPIView): # grades с фильтрацией по course и студенту   , для просмотра   всех оценок определенного студента
    queryset = Grades.objects.all()
    serializer_class = GradesSerializers
    filter_backends = (DjangoFilterBackend,)
    filterset_class = Filter
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate | IsStudentOwnerForList]



# нужно передавать /?course=<id>
# Admin , Teacher имеющий доступ
class GradesViewList(generics.ListAPIView): # grades с фильтрацией по course  , для просмотра  всех оценок студентов
    queryset = Grades.objects.all()
    serializer_class = AboutGradesSerializers
    filter_backends = (DjangoFilterBackend,)
    filterset_class = FilterOnlyCourse
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate]
    pagination_class = ListPagination


# нужно передавать /?course=<id>
# Admin , Teacher имеющий доступ
class GradesWithStudentInfoViewList(generics.ListAPIView): # grades с фильтрацией по course  , для просмотра  всех оценок студентов
    queryset = Grades.objects.all()
    serializer_class = GradesWithStudentInfoSerializers
    filter_backends = (DjangoFilterBackend,)
    filterset_class = Filter
    permission_classes = [IsAdminUser | IsTeacherHasAccessCreate]
    pagination_class = ListPagination


# Admin , Teacher имеющий доступ , Student свои оценки
class GradesViewRetrieve(generics.RetrieveAPIView):
    queryset = Grades.objects.all()
    serializer_class = GradesSerializers
    permission_classes = [IsAdminUser | IsTeacherHasAccess | IsStudentOwner]


# Admin , Teacher имеющий доступ
class ChangeGradesForTaskViewUpdate(generics.UpdateAPIView):
    queryset = Grades.objects.all()
    serializer_class = ChangeGradesForTask
    permission_classes = [IsAdminUser | IsTeacherHasAccess]


# Admin
class GradesViewDestroy(generics.DestroyAPIView):
    queryset = Grades.objects.all()
    serializer_class = CreateGradesSerializers
    permission_classes = [IsAdminUser]
