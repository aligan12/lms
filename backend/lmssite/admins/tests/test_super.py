from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from admins.models import Admins
from mysite.global_test.create_user import create_admin, create_student, create_teacher, course_props, create_super


class CoursesTestsGuest(APITestCase):
    def setUp(self):
        self.super_admin = create_super("super")
        self.admin, self.admin_profile = create_admin("admin")
        self.student_user, self.student_profile = create_student("student")
        self.teacher_user, self.teacher_profile = create_teacher("teacher")

    def test_course(self):

        self.client.force_authenticate(user=self.super_admin)

        # GET All
        url = reverse('admins-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(Admins.objects.count(), 1)


        # # GET ONE
        # url = reverse('admins-rud', kwargs={'pk': 1})
        # response = self.client.get(url)
        # self.assertEqual(response.status_code, status.HTTP_200_OK)
        # data = response.data
        # print("THIS IS DATA2 ", data)
        # self.assertEqual(Admins.objects.count(), 1)
        # self.assertEqual(data.get("name", ""), "admin")

        # UPDATE
        url = reverse('admins-rud', kwargs={'pk': self.admin.id})
        update_data = {'name': 'updated'}
        response = self.client.put(url, update_data, format='json')
        data = response.data
        print("THIS IS DATA2 ", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Admins.objects.count(), 1)
        self.assertEqual(Admins.objects.get().name, 'updated')

        # DELETE
        url = reverse('admins-rud', kwargs={'pk': self.admin.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Admins.objects.count(), 0)
