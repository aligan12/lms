from rest_framework import permissions

from course.models import Course
from students.models import Students


class IsStudentHasAccess(permissions.BasePermission):  # Проверен тестами
    def has_object_permission(self, request, view, obj):
        if bool(request.user and request.user.is_authenticated):
            if bool(request.user.type == "4"):
                student = Students.objects.filter(student=request.user)
                course = obj.course
                student_has_access = student[0].courses.all().filter(id=course.id).exists()
                if student_has_access:
                    return True


class IsStudentHasAccessCreate(permissions.BasePermission):
    def has_permission(self, request, view):
        if bool(request.user and request.user.is_authenticated):
            if bool(request.user.type == "4"):
                student_id = request.user.id
                if bool(request.method in permissions.SAFE_METHODS):
                    student = Students.objects.filter(student=student_id)
                    course_id = request.query_params.get('course')
                    if course_id is None:
                        print("Требуется /?course=<id>",  course_id)
                        print("Требуется /?course=<id>")
                        return False
                    student_has_access = student[0].courses.all().filter(id=course_id).exists()
                    if student_has_access:
                        return True
                else:
                    student = Students.objects.filter(student=student_id)
                    course_id = request.data.get('course')
                    if course_id is None:
                        print(" /?course=<id>", course_id)
                        print("Требуется /?course=<id>")
                        return False
                    student_has_access = student[0].courses.all().filter(id=course_id).exists()
                    if student_has_access:
                        return True


class IsTeacherHasAccessCreate(permissions.BasePermission):  # Проверен тестами для List требует /?course=<id>
    def has_permission(self, request, view):
        if bool(request.user and request.user.is_authenticated):
            if bool(request.user.type == "3"):
                if bool(request.method in permissions.SAFE_METHODS):
                    course_id = request.query_params.get('course')
                    if course_id is None:
                        print("Требуется /?course=<id>")
                        return False
                else:
                    course_id = request.data.get('course')
                course = Course.objects.filter(id=course_id)
                teachers_has_access = course[0].teacher.all().filter(teacher=request.user).exists()
                if teachers_has_access:
                    return True


class IsTeacherHasAccess(permissions.BasePermission):  # Проверен тестами
    def has_object_permission(self, request, view, obj):
        if bool(request.user and request.user.is_authenticated):
            if bool(request.user.type == "3"):
                if hasattr(obj, 'course'):
                    course = Course.objects.filter(id=obj.course.id)
                    teachers_has_access = course[0].teacher.all().filter(teacher=request.user).exists()
                    if teachers_has_access:
                        return True
                else:
                    course = obj
                    teachers_has_access = course.teacher.all().filter(teacher=request.user).exists()
                    if teachers_has_access:
                        return True


class IsTeacherOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if bool(request.user and request.user.is_authenticated):
            if bool(obj.teacher == request.user):
                return True


class IsTeacherOwnerForList(permissions.BasePermission):  # для List требует /?teacher=<id>
    def has_permission(self, request, view):
        if bool(request.user and request.user.is_authenticated):
            teacher = request.query_params.get('teacher')
            if teacher is None:
                print("Требуется /?teacher=<id>")
                return False
            if teacher == str(request.user.id):
                return True


class IsStudentOwner(permissions.BasePermission):  # Проверен тестами
    def has_object_permission(self, request, view, obj):
        if bool(request.user and request.user.is_authenticated):
            if bool(obj.student.id == request.user.id):
                return True


class IsStudentOwnerForList(permissions.BasePermission):  # для List требует /?student=<id>
    def has_permission(self, request, view):
        if bool(request.user and request.user.is_authenticated):
            student = request.query_params.get('student')
            if student is None:
                print("Требуется /?student=<id>")
                return False
            if student == str(request.user.id):
                return True


class IsAdminOwner(permissions.BasePermission):  # Проверен тестами
    def has_object_permission(self, request, view, obj):
        if bool(request.user and request.user.is_authenticated):
            if bool(obj.user == request.user):
                return True


class IsAdminOwnerForList(permissions.BasePermission):  # для List требует /?admin=<id>
    def has_permission(self, request, view):
        if bool(request.user and request.user.is_authenticated):
            admin = request.query_params.get('admin')
            if admin is None:
                print("Требуется /?admin=<id>")
                return False
            if admin == str(request.user.id):
                return True


class IsSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if bool(request.user and request.user.is_authenticated):
            return bool(request.user.is_superuser)


class IsStudent(permissions.BasePermission):  # Проверен тестами
    def has_permission(self, request, view):
        if bool(request.user and request.user.is_authenticated):
            print('TYPE',request.user.type)
            if bool(request.user.type == "4"):
                return True


class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        if bool(request.user and request.user.is_authenticated):

            if bool(request.user.type == "3"):
                return True


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if bool(request.user and request.user.is_authenticated):
            print('REQUEST',request.user)
            print('REQUEST2', obj.id)
            if bool(obj.id == request.user.id):
                return True

# class IsStudentHaveCourse(permissions.BasePermission):
#     def has_permission(self, request, view):
#         if bool(request.user and request.user.type == "4"):
#
