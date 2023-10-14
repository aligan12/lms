from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from course.models import Course
from file_tasks.models import FileTasksGrade

from mysite.global_test.create_user import create_admin, create_student, create_teacher, course_props, \
    file_tasks_grade_props, create_course


class FileTasksTestsGuest(APITestCase):
    def setUp(self):
        self.admin, self.admin_profile = create_admin("admin")
        self.student_user, self.student_profile = create_student("student")
        self.student_not_owner, self.student_profile2 = create_student("not_owner")
        self.teacher_user, self.teacher_profile = create_teacher("teacher")
        self.teacher_not_access, self.teacher_profile2 = create_teacher("teacher2")

        teachers_id = [self.teacher_user.id]
        students_id = [self.student_user.id]
        course = create_course('newTitle', teachers_id, students_id)
        self.teacher_profile.courses.set([course])
        self.student_profile.courses.set([course])

        course_id = course.id
        self.file_tasks_grade_props = file_tasks_grade_props("newTitle", course_id, students_id[0])

        self.client.force_authenticate(user=self.teacher_user)

        # POST create course
        url = reverse('file_tasks_grade-create') + '?course=1'
        response = self.client.post(url, self.file_tasks_grade_props, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FileTasksGrade.objects.count(), 1)
        self.assertEqual(FileTasksGrade.objects.get().comment, 'newTitle')

        self.client.logout()

    def test_teacher_has_access(self):
        self.client.force_authenticate(user=self.teacher_user)

        # GET All
        url = reverse('file_tasks_grade-list')  + '?course=1'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(FileTasksGrade.objects.count(), 1)


        # GET ONE
        url = reverse('file_tasks_grade-id', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA2 ", data)
        self.assertEqual(FileTasksGrade.objects.count(), 1)
        self.assertEqual(data.get("comment", ""), "newTitle")

        # UPDATE
        url = reverse('file_tasks_grade-rud', kwargs={'pk': 1})
        update_data = {'comment': 'updated'}
        response = self.client.put(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(FileTasksGrade.objects.count(), 1)
        self.assertEqual(FileTasksGrade.objects.get().comment, 'updated')

        # DELETE
        url = reverse('file_tasks_grade-rud', kwargs={'pk': 1})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(FileTasksGrade.objects.count(), 0)

    def test_teacher_not_access(self):
        self.client.force_authenticate(user=self.teacher_not_access)
        # POST
        url = reverse('file_tasks_grade-create') + '?course=1'
        response = self.client.post(url, self.file_tasks_grade_props, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(FileTasksGrade.objects.count(), 1)
        # self.assertEqual(Lectures.objects.get().title, 'newTitle')

        # GET All
        url = reverse('file_tasks_grade-list') + '?course=1'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(FileTasksGrade.objects.count(), 1)
        self.assertEqual(len(data), 1)

        # GET ONE
        url = reverse('file_tasks_grade-id', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        data = response.data
        print("THIS IS DATA2 ", data)
        self.assertEqual(FileTasksGrade.objects.count(), 1)
        self.assertEqual(data.get("comment", ""), "")

        # UPDATE
        url = reverse('file_tasks_grade-rud', kwargs={'pk': 1})
        update_data = {'comment': 'updated'}
        response = self.client.put(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(FileTasksGrade.objects.count(), 1)
        self.assertEqual(FileTasksGrade.objects.get().comment, 'newTitle')

        # DELETE
        url = reverse('file_tasks_grade-rud', kwargs={'pk': 1})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(FileTasksGrade.objects.count(), 1)
