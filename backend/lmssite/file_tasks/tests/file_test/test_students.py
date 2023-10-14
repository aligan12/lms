from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from file_tasks.models import FileTasks
from mysite.global_test.create_user import create_admin, create_student, create_teacher, course_props, create_course, \
    file_tasks_props


class CoursesTestsGuest(APITestCase):
    def setUp(self):
        self.admin, self.admin_profile = create_admin("admin")
        self.student_has_access, self.student_profile = create_student("student")
        self.student_not_access, self.student_profile2 = create_student("not_access")
        self.teacher_user, self.teacher_profile = create_teacher("teacher")

        teachers_id = [self.teacher_user.id]
        students_id = [self.student_has_access.id]
        course = create_course('newTitle', teachers_id, students_id)
        self.teacher_profile.courses.set([course])
        self.student_profile.courses.set([course])

        course_id = 1
        students_id = 1
        self.file_tasks_props = file_tasks_props("newTitle", course_id)

        self.client.force_authenticate(user=self.teacher_user)

        # POST create file tasks
        url = reverse('file_tasks-create')
        response = self.client.post(url, self.file_tasks_props, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FileTasks.objects.count(), 1)
        self.assertEqual(FileTasks.objects.get().title, 'newTitle')

        self.client.logout()

    def test_student_has_access(self):
        self.client.force_authenticate(user=self.student_has_access)
        # POST
        url = reverse('file_tasks-create')
        response = self.client.post(url, self.file_tasks_props, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(FileTasks.objects.count(), 1)
        # self.assertEqual(Lectures.objects.get().title, 'newTitle')

        # GET All
        url = reverse('file_tasks-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(FileTasks.objects.count(), 1)
        self.assertEqual(len(data), 1)

        # GET ONE
        url = reverse('file_tasks-id', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA2 ", data)
        self.assertEqual(FileTasks.objects.count(), 1)
        self.assertEqual(data.get("title", ""), "newTitle")

        # UPDATE
        url = reverse('file_tasks-rud', kwargs={'pk': 1})
        update_data = {'title': 'updated'}
        response = self.client.put(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(FileTasks.objects.count(), 1)
        self.assertEqual(FileTasks.objects.get().title, 'newTitle')

        # DELETE
        url = reverse('file_tasks-rud', kwargs={'pk': 1})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(FileTasks.objects.count(), 1)

    def test_student_not_access(self):
        self.client.force_authenticate(user=self.student_not_access)
        # POST
        url = reverse('file_tasks-create')
        response = self.client.post(url, self.file_tasks_props, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(FileTasks.objects.count(), 1)
        # self.assertEqual(Lectures.objects.get().title, 'newTitle')

        # GET All
        url = reverse('file_tasks-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(FileTasks.objects.count(), 1)
        self.assertEqual(len(data), 1)

        # GET ONE
        url = reverse('file_tasks-id', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        data = response.data
        print("THIS IS DATA2 ", data)
        self.assertEqual(FileTasks.objects.count(), 1)
        self.assertEqual(data.get("title", ""), "")

        # UPDATE
        url = reverse('file_tasks-rud', kwargs={'pk': 1})
        update_data = {'title': 'updated'}
        response = self.client.put(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(FileTasks.objects.count(), 1)
        self.assertEqual(FileTasks.objects.get().title, 'newTitle')

        # DELETE
        url = reverse('file_tasks-rud', kwargs={'pk': 1})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(FileTasks.objects.count(), 1)
