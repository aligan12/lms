from django_filters import rest_framework as filters

from students.models import CourseStudent


class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class Filter(filters.FilterSet):
    course = CharFilterInFilter(field_name='course')
    group = filters.BooleanFilter(field_name='group')
    student = CharFilterInFilter(field_name='student')
    class Meta:
        model = CourseStudent
        fields = ['course', 'group', 'student']