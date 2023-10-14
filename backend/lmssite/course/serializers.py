from rest_framework import serializers

from categories.serializers import CategorySerializers
from students.serializers import AboutStudentsSerializers, StudentsSerializers
from teachers.serializers import AboutTeachersSerializers
from .models import Course


class CreateCourseSerializers(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class CourseSerializers(serializers.ModelSerializer):
    teacher = AboutTeachersSerializers(many=True, read_only=True)

    class Meta:
        model = Course
        fields = '__all__'


class OnlyStudentsCourseSerializers(serializers.ModelSerializer):
    student = AboutStudentsSerializers(many=True)

    class Meta:
        model = Course
        fields = ['student', 'id']
