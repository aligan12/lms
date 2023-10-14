from rest_framework import serializers

from categories.models import Category


class CreateCategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class AboutCategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
