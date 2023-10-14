from django_filters import rest_framework as filters

from file_tasks.models import FileTasks, FileTasksAnswer


class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class Filter(filters.FilterSet):
    course = CharFilterInFilter(field_name='course')
    task = CharFilterInFilter(field_name='file_task')
    list_modules = CharFilterInFilter(field_name='list_modules')
    student = CharFilterInFilter(field_name='student')

    class Meta:
        model = FileTasksAnswer
        fields = ['course', 'task', 'list_modules', 'student']