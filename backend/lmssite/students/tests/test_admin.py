from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from mysite.global_test.create_user import create_admin, create_student, create_teacher, course_props, create_course
from students.models import Students


class CoursesTestsGuest(APITestCase):
    def setUp(self):
        self.student_user, self.student_profile = create_student("student")
        self.student_not_access, self.student_profile2 = create_student("not_access")
        self.admin, self.admin_profile = create_admin("admin")
        self.teacher_user, self.teacher_profile = create_teacher("teacher")

        # Create course
        teachers_id = [self.teacher_user.id]
        students_id = [self.student_user.id]
        course = create_course('newTitle', teachers_id, students_id)
        self.teacher_profile.courses.set([course])
        self.student_profile.courses.set([course])

        self.course_id = course.id

    def test_admin(self):
        self.client.force_authenticate(user=self.admin)
        # GET All
        url = reverse('students-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA ", data)
        self.assertEqual(Students.objects.count(), 2)
        # self.assertEqual(len(data), 1)

        # GET ONE
        url = reverse('students-id', kwargs={'pk': self.student_user.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        print("THIS IS DATA2 ", data)
        self.assertEqual(Students.objects.count(), 2)
        self.assertEqual(data.get("name", ""), 'student')

        # UPDATE
        url = reverse('students-rud', kwargs={'pk':self.student_user.id})
        print("Students DO", Students.objects.all())
        update_data = {'name': 'updated'}
        response = self.client.put(url, update_data, format='json')
        data = response.data
        print("THIS IS DATA2 ", data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Students.objects.get(student = self.student_user.id).name, 'student')

        # DELETE
        url = reverse('students-rud', kwargs={'pk': self.student_user.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Students.objects.count(), 2)

