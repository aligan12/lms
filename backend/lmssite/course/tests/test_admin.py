from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from course.models import Course
from mysite.global_test.create_user import create_admin, create_student, course_props, create_teacher


class CoursesTestsAdmin(APITestCase):
    def setUp(self):
        self.admin, self.admin_profile = create_admin("admin")
        self.student_user, self.student_profile = create_student("student")
        self.teacher_user, self.teacher_profile = create_teacher("teacher")

        teachers_id = [1]
        students_id = [1]
        print(course_props("newTitle", teachers_id, students_id))
        self.course_props = course_props("newTitle", teachers_id, students_id)
        self.course_props2 = course_props("second", teachers_id, students_id)

        self.client.force_authenticate(user=self.admin)

        # POST create course
        url = reverse('course-create')
        response = self.client.post(url, self.course_props, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Course.objects.count(), 1)
        self.assertEqual(Course.objects.get().title, 'newTitle')

        self.client.logout()

        course = Course.objects.filter(id=1)
        self.teacher_profile.courses.set(course)
        self.student_profile.courses.set(course)

    def test_course(self):
        self.client.force_authenticate(user=self.admin)

        # POST
        url = reverse('course-create')
        response = self.client.post(url, self.course_props2, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Course.objects.count(), 2)
        self.assertEqual(Course.objects.get(id=2).title, 'second')

        # GET All
        url = reverse('course-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(Course.objects.count(), 2)


        # GET ONE
        url = reverse('course-id', kwargs={'pk': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA2 ", data)
        self.assertEqual(Course.objects.count(), 2)
        self.assertEqual(data.get("title", ""), 'newTitle')

        # UPDATE
        url = reverse('course-update', kwargs={'pk': 1})
        update_data = {'title': 'updated'}
        response = self.client.put(url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Course.objects.count(), 2)
        self.assertEqual(Course.objects.get(id=1).title, 'updated')

        # DELETE
        url = reverse('course-delete', kwargs={'pk': 1})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Course.objects.count(), 1)
