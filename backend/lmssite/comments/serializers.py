from rest_framework import serializers

from comments.models import Comments
from students.serializers import AboutStudentsSerializers


class CreateCommentsSerializers(serializers.ModelSerializer):
    student = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Comments
        fields = '__all__'


class CommentsSerializers(serializers.ModelSerializer):
    student = AboutStudentsSerializers()

    class Meta:
        model = Comments
        fields = '__all__'


class AboutCommentsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'
