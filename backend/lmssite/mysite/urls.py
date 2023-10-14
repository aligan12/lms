from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include, re_path

from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from admins.views import AdminsViewList, AdminsRetrieveUpdateDestroyView
from categories.views import CategoriesViewCreate, CategoriesViewList, CategoriesViewRetrieve, \
    CategoriesViewRetrieveUpdateDestroy
from certificates.views import CertificatesViewCreate, CertificatesViewList, CertificatesView, CertificatesViewDestroy
from comments.views import CommentsViewCreate, CommentsViewList, \
    CommentsViewRetrieveUpdateDestroy
from course.views import CourseViewCreate, CourseViewList, CourseViewRetrieve, \
    CourseViewDestroy, CourseViewUpdate, CourseStudentsListViewRetrieve
from custom_user.views import ActivateUser, CustomUserViewUpdate
from file_tasks.views import FileTasksViewCreate, FileTasksViewList, FileTasksViewRetrieve, \
    FileTasksViewRetrieveUpdateDestroy, FileTasksGradeViewCreate, FileTasksGradeViewList, FileTasksGradeViewRetrieve, \
    FileTasksGradeViewRetrieveUpdateDestroy, FileTasksAnswerViewCreate, FileTasksAnswerViewList, \
    FileTasksAnswerViewRetrieve, FileTasksAnswerViewRetrieveUpdateDestroy
from grades.views import GradesViewList, GradesOneStudentViewList, GradesViewRetrieve, GradesViewDestroy, \
    AttendanceForLecturesViewCreate, ChangeGradesForTaskViewUpdate, GradesWithStudentInfoViewList
from lectures.views import LecturesViewCreate, LecturesViewList, LecturesViewRetrieve, \
    LecturesViewRetrieveUpdateDestroy, AdditionsViewCreate, LessonContentViewCreate
from list_modules.views import ListModulesViewCreate, ListModulesViewList, ListModulesViewRetrieve, \
    ListModulesViewRetrieveUpdateDestroy, OnlyTasksListModulesViewList, ModulesViewCreate, ModulesViewList, \
    ModulesViewRetrieve, ModulesViewRetrieveUpdateDestroy
from students.views import StudentsViewAll, StudentsViewRetrieve, \
    StudentsViewRetrieveUpdateDestroy, CourseStudentViewAll, CourseStudentViewCreate, OnlyCoursesStudentViewRetrieve
from support_chat.views import StudentTicketsViewCreate, StudentTicketsViewList, OnlyOneStudentTicketsViewList, \
    StudentTicketsViewRetrieve, StudentTicketsViewRetrieveUpdateDestroy, TeacherTicketsViewCreate, \
    TeacherTicketsViewList, OnlyOneTeacherTicketsViewList, TeacherTicketsViewRetrieve, \
    TeacherTicketsViewRetrieveUpdateDestroy, AdminTicketsViewCreate, AdminTicketsViewList, OnlyOneAdminTicketsViewList, \
    AdminTicketsViewRetrieve, AdminTicketsViewRetrieveUpdateDestroy, UnauthorizedTicketsViewCreate, \
    UnauthorizedTicketsViewList, UnauthorizedTicketsViewRetrieve, UnauthorizedTicketsViewRetrieveUpdateDestroy
from teachers.views import TeachersViewList, TeachersViewRetrieve, TeachersViewRetrieveUpdateDestroy
from test_tasks.views import TestTasksViewCreate, TestTasksViewList, TestTasksViewRetrieve, \
    TestTasksViewRetrieveUpdateDestroy, TestQuestionAnswerViewCreate, TestQuestionAnswerViewList, \
    TestQuestionAnswerViewRetrieve, TestQuestionAnswerViewRetrieveUpdateDestroy, TestAnswerOptionsViewAllCreate, \
    TestAnswerOptionsViewList, TestAnswerOptionsViewRetrieve, TestAnswerOptionsViewUpdateDestroy, \
    TestGradeViewList, TestGradeViewRetrieve, TestGradeViewRetrieveUpdateDestroy, \
    TestGradeViewCreate
from .views import index

urlpatterns = [

    # path('', index, name='index'),
    path('api/v1/admin/', admin.site.urls),
    path('api/v1/auth/', include('djoser.urls')),
    path('api/v1/auth/', include('djoser.urls.jwt')),
    path('api/v1/auth/', include('djoser.social.urls')),  ####для гугл?
    path('api/v1/accounts/activate/<uid>/<token>', ActivateUser.as_view({'get': 'activation'}), name='activation'),

    path('api/v1/admins/list/', AdminsViewList.as_view(), name='admins-list'),
    path('api/v1/admins/rud/<int:pk>', AdminsRetrieveUpdateDestroyView.as_view(), name='admins-rud'),

    path('api/v1/custom_user/update/<int:pk>', CustomUserViewUpdate.as_view()),


    path('api/v1/categories/create/', CategoriesViewCreate.as_view(), name='categories-create'),
    path('api/v1/categories/list/', CategoriesViewList.as_view(), name='categories-list'),
    path('api/v1/categories/id/<int:pk>', CategoriesViewRetrieve.as_view(), name='categories-id'),
    path('api/v1/categories/rud/<int:pk>', CategoriesViewRetrieveUpdateDestroy.as_view(), name='categories-rud'),

    path('api/v1/certificates/create/', CertificatesViewCreate.as_view(), name='certificates-create'),
    path('api/v1/certificates/list/', CertificatesViewList.as_view(), name='certificates-list'),
    path('api/v1/certificates/id/<int:pk>', CertificatesView.as_view(), name='certificates-id'),
    path('api/v1/certificates/delete/<int:pk>', CertificatesViewDestroy.as_view(), name='certificates-delete'),

    path('api/v1/comments/create/', CommentsViewCreate.as_view(), name="comments-create"),
    path('api/v1/comments/list/', CommentsViewList.as_view(), name="comments-list"),
    path('api/v1/comments/rud/<int:pk>', CommentsViewRetrieveUpdateDestroy.as_view(), name="comments-rud"),

    path('api/v1/course/create/', CourseViewCreate.as_view(), name="course-create"),
    path('api/v1/course/list/', CourseViewList.as_view(), name="course-list"),
    path('api/v1/course/id/<int:pk>', CourseViewRetrieve.as_view(), name="course-id"),
    path('api/v1/course/update/<int:pk>', CourseViewUpdate.as_view(), name="course-update"),
    path('api/v1/course/delete/<int:pk>', CourseViewDestroy.as_view(), name="course-delete"),
   path('api/v1/course_students/list/', CourseStudentsListViewRetrieve.as_view()),  # ????????

    path('api/v1/course_student/list/', CourseStudentViewAll.as_view()),

    path('api/v1/file_tasks/create/', FileTasksViewCreate.as_view(), name="file_tasks-create"),
    path('api/v1/file_tasks/list/', FileTasksViewList.as_view(), name="file_tasks-list"),
    path('api/v1/file_tasks/id/<int:pk>', FileTasksViewRetrieve.as_view(), name="file_tasks-id"),
    path('api/v1/file_tasks/rud/<int:pk>', FileTasksViewRetrieveUpdateDestroy.as_view(), name="file_tasks-rud"),

    path('api/v1/file_tasks_grade/create/', FileTasksGradeViewCreate.as_view(), name="file_tasks_grade-create"),
    # нужно передавать /?course=<id>
    path('api/v1/file_tasks_grade/list/', FileTasksGradeViewList.as_view(), name="file_tasks_grade-list"),
    path('api/v1/file_tasks_grade/id/<int:pk>', FileTasksGradeViewRetrieve.as_view(), name="file_tasks_grade-id"),
    path('api/v1/file_tasks_grade/rud/<int:pk>', FileTasksGradeViewRetrieveUpdateDestroy.as_view(),
         name="file_tasks_grade-rud"),

    path('api/v1/file_tasks_answer/create/', FileTasksAnswerViewCreate.as_view(), name="file_tasks_answer-create"),
    # нужно передавать /?course=<id>
    path('api/v1/file_tasks_answer/list/', FileTasksAnswerViewList.as_view(), name="file_tasks_answer-list"),
    path('api/v1/file_tasks_answer/id/<int:pk>', FileTasksAnswerViewRetrieve.as_view(), name="file_tasks_answer-id"),
    path('api/v1/file_tasks_answer/rud/<int:pk>', FileTasksAnswerViewRetrieveUpdateDestroy.as_view(),
         name="file_tasks_answer-rud"),

    # нужно передавать /?course=<id> /?student=<id>
    path('api/v1/attendance/create/', AttendanceForLecturesViewCreate.as_view()),
    # нужно передавать /?course=<id> /?student=<id>
    path('api/v1/grades_student/list/', GradesOneStudentViewList.as_view(), name="grades_student-list"),
    path('api/v1/grades/list/', GradesViewList.as_view(), name="grades-list"),  # нужно передавать /?course=<id>
    path('api/v1/grades/id/<int:pk>', GradesViewRetrieve.as_view(), name="grades-id"),
    path('api/v1/grades/update/<int:pk>', ChangeGradesForTaskViewUpdate.as_view(), name="grades-update"),
    path('api/v1/grades/delete/<int:pk>', GradesViewDestroy.as_view(), name="grades-delete"),
    path('api/v1/grades_with_student_info/list/', GradesWithStudentInfoViewList.as_view()),


    path('api/v1/lectures-additions/create/', AdditionsViewCreate.as_view()),
    path('api/v1/lectures-lesson/create/', LessonContentViewCreate.as_view()),
    path('api/v1/lectures/create/', LecturesViewCreate.as_view(), name="lectures-create"),
    path('api/v1/lectures/list/', LecturesViewList.as_view(), name="lectures-list"),  # нужно передавать /?course=<id>
    path('api/v1/lectures/id/<int:pk>', LecturesViewRetrieve.as_view(), name="lectures-id"),
    path('api/v1/lectures/rud/<int:pk>', LecturesViewRetrieveUpdateDestroy.as_view(), name="lectures-rud"),

    path('api/v1/list_modules/create/', ListModulesViewCreate.as_view(), name="listmodules-create"),
    # нужно передавать /?course=<id> /?student=<id>
    path('api/v1/list_modules/list/', ListModulesViewList.as_view(), name="listmodules-list"),
    # нужно передавать /?course=<id> /?student=<id>
    path('api/v1/list_modules_tasks/list/', OnlyTasksListModulesViewList.as_view()),
    path('api/v1/list_modules/id/<int:pk>', ListModulesViewRetrieve.as_view(), name="listmodules-id"),
    path('api/v1/list_modules/rud/<int:pk>', ListModulesViewRetrieveUpdateDestroy.as_view(), name="listmodules-rud"),

    path('api/v1/modules/create/', ModulesViewCreate.as_view()),
    path('api/v1/modules/list/', ModulesViewList.as_view()),
    path('api/v1/modules/id/<int:pk>', ModulesViewRetrieve.as_view()),
    path('api/v1/modules/rud/<int:pk>', ModulesViewRetrieveUpdateDestroy.as_view()),


    path('api/v1/only_courses_student/id/<int:pk>', OnlyCoursesStudentViewRetrieve.as_view()),
    path('api/v1/students/list/', StudentsViewAll.as_view(), name="students-list"),
    path('api/v1/students/id/<int:pk>', StudentsViewRetrieve.as_view(), name="students-id"),
    path('api/v1/students/rud/<int:pk>', StudentsViewRetrieveUpdateDestroy.as_view(), name="students-rud"),
    path('api/v1/students_course/create/', CourseStudentViewCreate.as_view()),
    path('api/v1/students_course/list/', CourseStudentViewAll.as_view()),

    path('api/v1/teachers/list/', TeachersViewList.as_view(), name="teachers-list"),
    path('api/v1/teachers/id/<int:pk>', TeachersViewRetrieve.as_view(), name="teachers-id"),
    path('api/v1/teachers/rud/<int:pk>', TeachersViewRetrieveUpdateDestroy.as_view(), name="teachers-rud"),

    path('api/v1/test_tasks/create/', TestTasksViewCreate.as_view(), name="test_tasks-create"),
    path('api/v1/test_tasks/list/', TestTasksViewList.as_view(), name="test_tasks-list"),
    # нужно передавать /?course=<id> /?student=<id>
    path('api/v1/test_tasks/id/<int:pk>', TestTasksViewRetrieve.as_view(), name="test_tasks-id"),
    path('api/v1/test_tasks/rud/<int:pk>', TestTasksViewRetrieveUpdateDestroy.as_view(), name="test_tasks-rud"),

    path('api/v1/test_question_answer/create/', TestQuestionAnswerViewCreate.as_view(),
         name="test_question_answer-create"),
    path('api/v1/test_question_answer/list/', TestQuestionAnswerViewList.as_view(), name="test_question_answer-list"),
    # нужно передавать /?course=<id>
    path('api/v1/test_question_answer/id/<int:pk>', TestQuestionAnswerViewRetrieve.as_view(),
         name="test_question_answer-id"),
    path('api/v1/test_question_answer/rud/<int:pk>', TestQuestionAnswerViewRetrieveUpdateDestroy.as_view(),
         name="test_question_answer-rud"),

    path('api/v1/test_answer_options/create/', TestAnswerOptionsViewAllCreate.as_view()),
    # нужно передавать /?course=<id> /?student=<id>
    path('api/v1/test_answer_options/list/', TestAnswerOptionsViewList.as_view()),
    path('api/v1/test_answer_options/id/<int:pk>', TestAnswerOptionsViewRetrieve.as_view()),
    path('api/v1/test_answer_options/rud/<int:pk>', TestAnswerOptionsViewUpdateDestroy.as_view()),

    path('api/v1/test_tasks_grade/create/', TestGradeViewCreate.as_view(), name="test_tasks_grade-create"),
    path('api/v1/test_tasks_grade/list/', TestGradeViewList.as_view(), name="test_tasks_grade-list"),
    # нужно передавать /?course=<id>
    path('api/v1/test_tasks_grade/id/<int:pk>', TestGradeViewRetrieve.as_view(), name="test_tasks_grade-id"),
    path('api/v1/test_tasks_grade/rud/<int:pk>', TestGradeViewRetrieveUpdateDestroy.as_view(),
         name="test_tasks_grade-rud"),

    path('api/v1/student_ticket/create/', StudentTicketsViewCreate.as_view(), name="student_ticket-create"),
    path('api/v1/student_ticket/list/', StudentTicketsViewList.as_view(), name="student_ticket-list"),
    path('api/v1/one_student_ticket/list/', OnlyOneStudentTicketsViewList.as_view()),  # требует /?student=<id>
    path('api/v1/student_ticket/id/<int:pk>', StudentTicketsViewRetrieve.as_view(), name="student_ticket-id"),
    path('api/v1/student_ticket/rud/<int:pk>', StudentTicketsViewRetrieveUpdateDestroy.as_view(),
         name="student_ticket-rud"),

    path('api/v1/teacher_ticket/create/', TeacherTicketsViewCreate.as_view(), name="teacher_ticket-create"),
    path('api/v1/teacher_ticket/list/', TeacherTicketsViewList.as_view(), name="teacher_ticket-list"),
    path('api/v1/one_teacher_ticket/list/', OnlyOneTeacherTicketsViewList.as_view()),  # требует /?teacher=<id>
    path('api/v1/teacher_ticket/id/<int:pk>', TeacherTicketsViewRetrieve.as_view(), name="teacher_ticket-id"),
    path('api/v1/teacher_ticket/rud/<int:pk>', TeacherTicketsViewRetrieveUpdateDestroy.as_view(),
         name="teacher_ticket-rud"),

    path('api/v1/admin_ticket/create/', AdminTicketsViewCreate.as_view(), name="admin_ticket-create"),
    path('api/v1/admin_ticket/list/', AdminTicketsViewList.as_view(), name="admin_ticket-list"),
    path('api/v1/one_admin_ticket/list/', OnlyOneAdminTicketsViewList.as_view()),  # требует /?admin=<id>
    path('api/v1/admin_ticket/id/<int:pk>', AdminTicketsViewRetrieve.as_view(), name="admin_ticket-id"),
    path('api/v1/admin_ticket/rud/<int:pk>', AdminTicketsViewRetrieveUpdateDestroy.as_view(), name="admin_ticket-rud"),

    path('api/v1/unauthorized_ticket/create/', UnauthorizedTicketsViewCreate.as_view(),
         name="unauthorized_ticket-create"),
    path('api/v1/unauthorized_ticket/list/', UnauthorizedTicketsViewList.as_view(), name="unauthorized_ticket-list"),
    path('api/v1/unauthorized_ticket/id/<int:pk>', UnauthorizedTicketsViewRetrieve.as_view(),
         name="unauthorized_ticket-id"),
    path('api/v1/unauthorized_ticket/rud/<int:pk>', UnauthorizedTicketsViewRetrieveUpdateDestroy.as_view(),
         name="unauthorized_ticket-rud"),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
