from rest_framework import serializers

from course.about_serializers import AboutCourseSerializers
from students.serializers import AboutStudentsSerializers
from certificates.models import Certificates


class CreateCertificatesSerializers(serializers.ModelSerializer):
    student = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Certificates
        fields = '__all__'


class CertificatesSerializers(serializers.ModelSerializer):
    course = AboutCourseSerializers()
    student = AboutStudentsSerializers()

    class Meta:
        model = Certificates
        fields = '__all__'


class AboutCertificatesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Certificates
        fields = '__all__'
