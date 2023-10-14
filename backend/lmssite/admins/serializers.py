from rest_framework import serializers

from .models import Admins


class CreateAdminsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Admins
        fields = '__all__'


# class AdminsSerializers(serializers.ModelSerializer):
#     user = serializers.HiddenField(default=serializers.CurrentUserDefault())
#     class Meta:
#         model = Admins
#         fields = ['admin_type']

class AdminsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Admins
        fields = '__all__'


class AboutAdminsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Admins
        fields = '__all__'
