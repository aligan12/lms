from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from certificates.models import Certificates
from comments.models import Comments
from course.models import Course
from mysite.global_test.create_user import create_admin, create_student, create_teacher, course_props, create_course, \
    certificates_props, comment_props


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
        self.comment_props = comment_props("newTitle", course_id, students_id)

        self.client.force_authenticate(user=self.student_user)
        # POST
        url = reverse('comments-create')
        response = self.client.post(url, self.comment_props, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comments.objects.count(), 1)
        self.assertEqual(Comments.objects.get().text, 'newTitle')

        self.client.logout()

    def test_course(self):
        # POST
        url = reverse('comments-create')
        response = self.client.post(url, self.comment_props, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Comments.objects.count(), 1)
        # self.assertEqual(Lectures.objects.get().title, 'newTitle')

        # GET All
        url = reverse('comments-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(Comments.objects.count(), 1)


        # GET ONE
        url = reverse('comments-rud', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        data = response.data
        print("THIS IS DATA2 ", data)
        self.assertEqual(Comments.objects.count(), 1)
        self.assertEqual(data.get("text", ""), "")

        # UPDATE
        url = reverse('comments-rud', kwargs={'pk': 1})
        update_data = {'title': 'updated'}
        response = self.client.put(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Comments.objects.count(), 1)
        self.assertEqual(Comments.objects.get().text, 'newTitle')

        # DELETE
        url = reverse('comments-rud', kwargs={'pk': 1})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Comments.objects.count(), 1)
