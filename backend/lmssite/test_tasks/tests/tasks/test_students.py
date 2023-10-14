from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from file_tasks.models import FileTasks
from mysite.global_test.create_user import create_admin, create_student, create_teacher, create_course, \
    file_tasks_props, test_tasks_props
from test_tasks.models import TestTasks


class CoursesTestsGuest(APITestCase):
    def setUp(self):
        self.student_user, self.student_profile = create_student("student")
        self.student_not_access, self.student_profile2 = create_student("student2")
        self.admin, self.admin_profile = create_admin("admin")
        self.teacher_user, self.teacher_profile = create_teacher("teacher")

        teachers_id = [self.teacher_user.id]
        students_id = [self.student_user.id]
        course = create_course('newTitle', teachers_id, students_id)
        self.teacher_profile.courses.set([course])
        self.student_profile.courses.set([course])

        self.course_id = course.id
        students_id = 1
        self.test_tasks_props = test_tasks_props("newTitle", self.course_id)

        self.client.force_authenticate(user=self.teacher_user)

        # POST create file tasks
        url = reverse('test_tasks-create')
        response = self.client.post(url, self.test_tasks_props, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestTasks.objects.count(), 1)
        self.assertEqual(TestTasks.objects.get().title, 'newTitle')

        self.client.logout()

    def test_course(self):
        self.client.force_authenticate(user=self.student_user)
        # POST
        url = reverse('test_tasks-create')
        response = self.client.post(url, self.test_tasks_props, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(TestTasks.objects.count(), 1)
        # self.assertEqual(Lectures.objects.get().title, 'newTitle')

        # GET All
        url = reverse('test_tasks-list') + f'?course={self.course_id}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(TestTasks.objects.count(), 1)

        # GET ONE
        url = reverse('test_tasks-id', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA2 ", data)
        self.assertEqual(TestTasks.objects.count(), 1)
        self.assertEqual(data.get("title", ""), "newTitle")

        # UPDATE
        url = reverse('test_tasks-rud', kwargs={'pk': 1})
        update_data = {'title': 'updated'}
        response = self.client.put(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(TestTasks.objects.count(), 1)
        self.assertEqual(TestTasks.objects.get().title, 'newTitle')

        # DELETE
        url = reverse('test_tasks-rud', kwargs={'pk': 1})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(TestTasks.objects.count(), 1)

    def test_student_not_access(self):
        self.client.force_authenticate(user=self.student_not_access)
        url = reverse('test_tasks-create')
        response = self.client.post(url, self.test_tasks_props, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(TestTasks.objects.count(), 1)
        # self.assertEqual(Lectures.objects.get().title, 'newTitle')

        # GET All
        url = reverse('test_tasks-list') + f'?course={self.course_id}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(TestTasks.objects.count(), 1)
        self.assertEqual(len(data), 1)

        # GET ONE
        url = reverse('test_tasks-id', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        data = response.data
        print("THIS IS DATA2 ", data)
        self.assertEqual(TestTasks.objects.count(), 1)
        self.assertEqual(data.get("title", ""), "")

        # UPDATE
        url = reverse('test_tasks-rud', kwargs={'pk': 1})
        update_data = {'title': 'updated'}
        response = self.client.put(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(TestTasks.objects.count(), 1)
        self.assertEqual(TestTasks.objects.get().title, 'newTitle')

        # DELETE
        url = reverse('test_tasks-rud', kwargs={'pk': 1})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(TestTasks.objects.count(), 1)
