from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAdminUser , AllowAny

from custom_user.permissions import IsStudent
from certificates.models import Certificates

from certificates.serializers import CertificatesSerializers, CreateCertificatesSerializers, AboutCertificatesSerializers
from mysite.pagination import ListPagination


# Student and Admin
class CertificatesViewCreate(generics.CreateAPIView):
    queryset = Certificates.objects.all()
    serializer_class = CreateCertificatesSerializers
    permission_classes = [IsAdminUser | IsStudent]
    def perform_create(self, serializer):
        serializer.validated_data['student'] = self.request.user
        serializer.save()


# All
class CertificatesViewList(generics.ListAPIView):
    queryset = Certificates.objects.all()
    serializer_class = AboutCertificatesSerializers
    permission_classes = [AllowAny]
    pagination_class = ListPagination


# All
class CertificatesView(generics.RetrieveAPIView):
    queryset = Certificates.objects.all()
    serializer_class = CertificatesSerializers
    permission_classes = [AllowAny]


# # НЕ НУЖНО
# class CertificatesViewUpdate(generics.UpdateAPIView):
#     queryset = Certificates.objects.all()
#     serializer_class = CreateCertificatesSerializers
#     permission_classes = (IsAuthenticated,)


# Admin
class CertificatesViewDestroy(generics.DestroyAPIView):
    queryset = Certificates.objects.all()
    serializer_class = CreateCertificatesSerializers
    permission_classes = [IsAdminUser]
