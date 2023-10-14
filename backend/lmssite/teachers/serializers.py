from categories.serializers import CategorySerializers
from teachers.models import Teachers

from rest_framework import serializers


class CreateTeachersSerializers(serializers.ModelSerializer):
    teacher = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Teachers
        fields = '__all__'


class TeachersSerializers(serializers.ModelSerializer):
    category = CategorySerializers()

    class Meta:
        model = Teachers
        fields = '__all__'


class AboutTeachersSerializers(serializers.ModelSerializer):
    class Meta:
        model = Teachers
        fields = ('name', 'surname', 'patronymic')
