from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from lectures.models import Lectures
from mysite.global_test.create_user import create_admin, create_student, create_teacher, create_course, lectures_props


class LecturesTestsGuest(APITestCase):
    def setUp(self):
        self.student_user, self.student_profile = create_student("student")
        self.student_not_access, self.student_profile2 = create_student("not_access")
        self.admin, self.admin_profile = create_admin("admin")
        self.teacher_user, self.teacher_profile = create_teacher("teacher")
        self.teacher_not_access, self.teacher_profile2 = create_teacher("teacher_not_access")


        # Create course
        teachers_id = [self.teacher_user.id]
        students_id = [self.student_user.id]
        course = create_course('newTitle', teachers_id, students_id)
        self.teacher_profile.courses.set([course])
        self.student_profile.courses.set([course])

        self.course_id = course.id
        self.lectures_props = lectures_props("newTitle", self.course_id)

        self.client.force_authenticate(user=self.admin)

        # POST create file tasks
        url = reverse('lectures-create')
        response = self.client.post(url, self.lectures_props, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Lectures.objects.count(), 1)
        self.assertEqual(Lectures.objects.get().title, 'newTitle')

        self.client.logout()

    def test_teacher_has_access(self):
        self.client.force_authenticate(user=self.admin)

        # GET All
        url = reverse('lectures-list') + f'?course={self.course_id}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(Lectures.objects.count(), 1)
        # self.assertEqual(len(data), 1)

        # GET ONE
        url = reverse('lectures-id', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        self.assertEqual(Lectures.objects.count(), 1)
        # self.assertEqual(data.title, 'newTitle')

        # UPDATE
        url = reverse('lectures-rud', kwargs={'pk': 1})
        update_data = {'title': 'updated'}
        response = self.client.put(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Lectures.objects.count(), 1)
        self.assertEqual(Lectures.objects.get().title, 'updated')

        # DELETE
        url = reverse('lectures-rud', kwargs={'pk': 1})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Lectures.objects.count(), 0)
