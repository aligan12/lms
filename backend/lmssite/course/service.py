from django_filters import rest_framework as filters

from course.models import Course


class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class Filter(filters.FilterSet):
    category = CharFilterInFilter(field_name='category__title')
    publish = filters.BooleanFilter(field_name='is_published')
    teacher = CharFilterInFilter(field_name='teacher')
    id = CharFilterInFilter(field_name='id')


    class Meta:
        model = Course
        fields = ['category', 'publish', 'teacher', 'id']