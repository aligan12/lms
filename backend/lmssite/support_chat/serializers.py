from django.db import models
from rest_framework import serializers

from custom_user.models import User
from support_chat.models import AdminTickets, UnauthorizedTickets, TeacherTickets, StudentTickets


class StudentTicketsSerializers(serializers.ModelSerializer):
    class Meta:
        model = StudentTickets
        fields = '__all__'


class TeacherTicketsSerializers(serializers.ModelSerializer):
    class Meta:
        model = TeacherTickets
        fields = '__all__'


class AdminTicketsSerializers(serializers.ModelSerializer):
    class Meta:
        model = AdminTickets
        fields = '__all__'


class UnauthorizedTicketsSerializers(serializers.ModelSerializer):
    class Meta:
        model = UnauthorizedTickets
        fields = '__all__'


#################################################################################################

class AboutStudentTicketsSerializers(serializers.ModelSerializer):
    class Meta:
        model = StudentTickets
        fields = '__all__'


class AboutTeacherTicketsSerializers(serializers.ModelSerializer):
    class Meta:
        model = TeacherTickets
        fields = '__all__'


class AboutAdminTicketsSerializers(serializers.ModelSerializer):
    class Meta:
        model = AdminTickets
        fields = '__all__'


class AboutUnauthorizedTicketsSerializers(serializers.ModelSerializer):
    class Meta:
        model = UnauthorizedTickets
        fields = '__all__'


#################################################################################################

class CreateStudentTicketsSerializers(serializers.ModelSerializer):
    student = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = StudentTickets
        fields = '__all__'


class CreateTeacherTicketsSerializers(serializers.ModelSerializer):
    teacher = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = TeacherTickets
        fields = '__all__'


class CreateAdminTicketsSerializers(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = AdminTickets
        fields = '__all__'


class CreateUnauthorizedTicketsSerializers(serializers.ModelSerializer):
    class Meta:
        model = UnauthorizedTickets
        fields = '__all__'
