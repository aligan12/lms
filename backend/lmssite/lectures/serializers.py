from rest_framework import serializers

from lectures.models import Lectures, Additions, LessonContent





class CreateAdditionsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Additions
        fields = '__all__'


class CreateLessonContentSerializers(serializers.ModelSerializer):
    class Meta:
        model = LessonContent
        fields = '__all__'


class LecturesSerializers(serializers.ModelSerializer):
    additions = CreateAdditionsSerializers(many=True)
    lesson = CreateLessonContentSerializers(many=True)
    class Meta:
        model = Lectures
        fields = '__all__'


class CreateLecturesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Lectures
        fields = '__all__'


class AboutLecturesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Lectures
        fields = ['title' , 'description','id']