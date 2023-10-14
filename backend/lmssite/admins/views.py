from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from custom_user.permissions import IsSuperAdmin
from mysite.pagination import ListPagination
from .models import Admins

from .serializers import AdminsSerializers, CreateAdminsSerializers, AboutAdminsSerializers


# Super
class AdminsViewList(generics.ListAPIView):
    queryset = Admins.objects.all()
    serializer_class = AboutAdminsSerializers
    permission_classes = [IsSuperAdmin]
    pagination_class = ListPagination


# Super
class AdminsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Admins.objects.all()
    serializer_class = AdminsSerializers
    permission_classes = [IsSuperAdmin| IsAdminUser]
