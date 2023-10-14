import datetime

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from course.models import Course
from file_tasks.models import FileTasksAnswer
from grades.models import Grades

from mysite.global_test.create_user import create_admin, create_student, create_teacher, course_props, create_course, \
    file_tasks_answer_props, create_list_modules


class CoursesTestsGuest(APITestCase):
    def setUp(self):
        self.student_user, self.student_profile = create_student("student")
        self.student_not_owner, self.student_profile2 = create_student("not_owner")
        self.admin, self.admin_profile = create_admin("admin")
        self.teacher_user, self.teacher_profile = create_teacher("teacher")
        self.teacher_not_access, self.teacher_profile2 = create_teacher("teacher_not_access")

        # Create course
        teachers_id = [self.teacher_user.id]
        self.students_id = [self.student_user.id]
        course = create_course('newTitle', teachers_id, self.students_id)
        self.teacher_profile.courses.set([course])
        self.student_profile.courses.set([course])

        # Create list module
        list_modules = create_list_modules('newTitle', datetime.datetime.now())

        self.course_id = course.id
        list_modules_id = list_modules.id
        self.file_tasks_answer_props = file_tasks_answer_props(self.course_id, list_modules_id, self.students_id[0])

        self.client.force_authenticate(user=self.student_user)

        # POST create file tasks
        url = reverse('file_tasks_answer-create')
        print(url)
        response = self.client.post(url, self.file_tasks_answer_props, format='json')
        data = response.data
        print("THIS IS Start ", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FileTasksAnswer.objects.count(), 1)
        # self.assertEqual(FileTasksAnswer.objects.get().title, 'newTitle')

        self.client.logout()

    def test_teacher_has_access(self):
        self.client.force_authenticate(user= self.teacher_user)
        # GET All
        url = reverse('grades-list') + f'?course={self.course_id}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(Grades.objects.count(), 1)
        name = "grades_student-list"

        # grades с фильтрацией по course и студенту   , для просмотра   всех оценок определенного студента
        url = reverse('grades_student-list') + f'?course={self.course_id}&student={self.students_id[0]}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(Grades.objects.count(), 1)


        # GET ONE
        url = reverse('grades-id', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA2 ", data)
        self.assertEqual(Grades.objects.count(), 1)
        # self.assertEqual(data.get("title", ""), '')

        # UPDATE
        url = reverse('grades-update', kwargs={'pk': 1})
        update_data = {'grade': '3'}
        response = self.client.put(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Grades.objects.count(), 1)
        self.assertEqual(Grades.objects.get().grade, 3)

        # DELETE
        url = reverse('grades-delete', kwargs={'pk': 1})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Grades.objects.count(), 1)

    def test_teacher_not_access(self):
        self.client.force_authenticate(user=self.teacher_not_access)
        # GET All
        url = reverse('grades-list') + f'?course={self.course_id}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(Grades.objects.count(), 1)
        self.assertEqual(len(data), 1)
        name = "grades_student-list"

        # grades с фильтрацией по course и студенту   , для просмотра   всех оценок определенного студента
        url = reverse('grades_student-list') + f'?course={self.course_id}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(Grades.objects.count(), 1)
        self.assertEqual(len(data), 1)

        # GET ONE
        url = reverse('grades-id', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        data = response.data
        print("THIS IS DATA2 ", data)
        self.assertEqual(Grades.objects.count(), 1)
        # self.assertEqual(data.get("title", ""), '')

        # UPDATE
        url = reverse('grades-update', kwargs={'pk': 1})
        update_data = {'title': 'updated'}
        response = self.client.put(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Grades.objects.count(), 1)
        # self.assertEqual(FileTasksAnswer.objects.get().title, 'newTitle')

        # DELETE
        url = reverse('grades-delete', kwargs={'pk': 1})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Grades.objects.count(), 1)
