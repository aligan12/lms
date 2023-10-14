from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from course.models import Course
from file_tasks.models import FileTasksGrade

from mysite.global_test.create_user import create_admin, create_student, create_teacher, course_props, \
    file_tasks_grade_props, create_course, question_answer_props, create_test_options
from test_tasks.models import TestQuestionAnswer


class FileTasksTestsGuest(APITestCase):
    def setUp(self):
        self.admin, self.admin_profile = create_admin("admin")
        self.student_user, self.student_profile = create_student("student")
        self.teacher_user, self.teacher_profile = create_teacher("teacher")

        teachers_id = [self.teacher_user.id]
        students_id = [self.student_user.id]
        course = create_course('newTitle', teachers_id, students_id)
        self.teacher_profile.courses.set([course])
        self.student_profile.courses.set([course])

        self.course_id = course.id
        options = create_test_options("newTitle", course)
        options_id = [options.id]

        self.question_answer_props = question_answer_props("newTitle", self.course_id,options_id)

        self.client.force_authenticate(user=self.student_user)

        # POST create course
        url = reverse('test_question_answer-create')
        response = self.client.post(url, self.question_answer_props, format='json')
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TestQuestionAnswer.objects.count(), 1)
        self.assertEqual(TestQuestionAnswer.objects.get().question, 'newTitle')

        self.client.logout()

    def test_course(self):
        self.client.force_authenticate(user=self.admin)

        # POST create course
        url = reverse('test_question_answer-create')
        response = self.client.post(url, self.question_answer_props, format='json')
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(TestQuestionAnswer.objects.count(), 1)
        self.assertEqual(TestQuestionAnswer.objects.get().question, 'newTitle')

        # GET All
        url = reverse('test_question_answer-list') + f'?course={self.course_id}'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(TestQuestionAnswer.objects.count(), 1)

        # GET ONE
        url = reverse('test_question_answer-id', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA2 ", data)
        self.assertEqual(TestQuestionAnswer.objects.count(), 1)
        self.assertEqual(data.get("question", ""), "newTitle")

        # UPDATE
        url = reverse('test_question_answer-rud', kwargs={'pk': 1})
        update_data = {'question': 'updated'}
        response = self.client.put(url, update_data, format='json')
        data = response.data
        print("THIS IS DATA2 ", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(TestQuestionAnswer.objects.count(), 1)
        self.assertEqual(TestQuestionAnswer.objects.get().question, 'updated')

        # DELETE
        url = reverse('test_question_answer-rud', kwargs={'pk': 1})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(TestQuestionAnswer.objects.count(), 0)
