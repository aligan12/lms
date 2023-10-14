from rest_framework import serializers

from grades.models import Grades
from list_modules.serializers import CreateListModulesSerializers
from students.serializers import AboutStudentsSerializers


class CreateGradesSerializers(serializers.ModelSerializer):
    student = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Grades
        fields = '__all__'


class GradesSerializers(serializers.ModelSerializer):
    list_modules = CreateListModulesSerializers()
    class Meta:
        model = Grades
        fields = '__all__'


class AboutGradesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Grades
        fields = '__all__'


class GradesWithStudentInfoSerializers(serializers.ModelSerializer):
    student_profile = AboutStudentsSerializers()
    class Meta:
        model = Grades
        fields = '__all__'



class ChangeGradesForTask(serializers.ModelSerializer):
    class Meta:
        model = Grades
        fields = ['grade', 'teacher_comment']

