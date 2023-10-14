from django_filters import rest_framework as filters

from support_chat.models import StudentTickets, TeacherTickets, AdminTickets


class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class FilterForStudents(filters.FilterSet):
    student = CharFilterInFilter(field_name='student')

    class Meta:
        model = StudentTickets
        fields = ['student']


class FilterForTeachers(filters.FilterSet):
    teacher = CharFilterInFilter(field_name='teacher')

    class Meta:
        model = TeacherTickets
        fields = ['teacher']


class FilterForAdmins(filters.FilterSet):
    user = CharFilterInFilter(field_name='user')

    class Meta:
        model = AdminTickets
        fields = ['user']