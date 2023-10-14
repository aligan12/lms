from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from lectures.models import Lectures
from mysite.global_test.create_user import create_admin, create_student, create_teacher, create_course, lectures_props
from support_chat.models import UnauthorizedTickets, StudentTickets, TeacherTickets, AdminTickets


class LecturesTestsGuest(APITestCase):
    def setUp(self):
        self.admin, self.admin_profile = create_admin("admin")
        self.student_user, self.student_profile = create_student("student")
        self.teacher_user, self.teacher_profile = create_teacher("teacher")

        # Create course
        teachers_id = [self.teacher_user.id]
        students_id = [self.student_user.id]
        course = create_course('newTitle', teachers_id, students_id)
        self.teacher_profile.courses.set([course])
        self.student_profile.courses.set([course])

        self.tickets_props = {'title' : 'newTitle'}

        self.client.force_authenticate(user=self.admin)

        # POST create file tasks
        url = reverse('admin_ticket-create')
        response = self.client.post(url, self.tickets_props, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AdminTickets.objects.count(), 1)
        self.assertEqual(AdminTickets.objects.get().title, 'newTitle')

        self.client.logout()

    def test_lectures_create(self):
        self.client.force_authenticate(user=self.admin)
        # GET All
        url = reverse('admin_ticket-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(AdminTickets.objects.count(), 1)
        self.assertEqual(len(data), 1)

        # GET ONE
        url = reverse('admin_ticket-id', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(AdminTickets.objects.count(), 1)
        self.assertEqual(data.get('title',''), 'newTitle')

        # UPDATE
        url = reverse('admin_ticket-rud', kwargs={'pk': 1})
        update_data = {'title': 'updated'}
        response = self.client.put(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(AdminTickets.objects.count(), 1)
        self.assertEqual(AdminTickets.objects.get().title, 'updated')

        # DELETE
        url = reverse('admin_ticket-rud', kwargs={'pk': 1})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(AdminTickets.objects.count(), 0)