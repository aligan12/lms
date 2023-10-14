from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from certificates.models import Certificates
from course.models import Course
from mysite.global_test.create_user import create_admin, create_student, create_teacher, course_props, create_course, \
    certificates_props


class CoursesTestsGuest(APITestCase):
    def setUp(self):
        self.admin, self.admin_profile = create_admin("admin")
        self.student_user, self.student_profile = create_student("student")
        self.teacher_user, self.teacher_profile = create_teacher("teacher")
        teachers_id = [self.teacher_user.id]
        students_id = [self.student_user.id]
        course = create_course('newTitle', teachers_id, students_id)
        self.teacher_profile.courses.set([course])
        self.student_profile.courses.set([course])
        course_id = 1
        students_id = 1
        self.certificates_props = certificates_props("newTitle", course_id, students_id)

        self.client.force_authenticate(user=self.student_user)
        # POST
        url = reverse('certificates-create')
        response = self.client.post(url, self.certificates_props, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Certificates.objects.count(), 1)
        self.assertEqual(Certificates.objects.get().title, 'newTitle')

        self.client.logout()

    def test_course(self):
        self.client.force_authenticate(user=self.teacher_user)
        # POST
        url = reverse('certificates-create')
        response = self.client.post(url, self.certificates_props, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Certificates.objects.count(), 1)
        # self.assertEqual(Lectures.objects.get().title, 'newTitle')

        # GET All
        url = reverse('certificates-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(Certificates.objects.count(), 1)
        self.assertEqual(len(data), 1)

        # GET ONE
        url = reverse('certificates-id', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA2 ", data)
        self.assertEqual(Certificates.objects.count(), 1)
        self.assertEqual(data.get("title", ""), 'newTitle')

        # # UPDATE
        # url = reverse('course-update', kwargs={'pk': 1})
        # update_data = {'title': 'updated'}
        # response = self.client.put(url, update_data, format='json')
        # self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        # self.assertEqual(Course.objects.count(), 1)
        # self.assertEqual(Course.objects.get().title, 'newTitle')

        # DELETE
        url = reverse('certificates-delete', kwargs={'pk': 1})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Certificates.objects.count(), 1)
