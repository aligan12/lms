from rest_framework import serializers

from categories.serializers import CategorySerializers
from course.models import Course



class AboutCourseSerializers(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ('id', 'title', 'category', 'image' , 'description','price')

