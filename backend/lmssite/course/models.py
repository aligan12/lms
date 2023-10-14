from django.db import models

from custom_user.models import User
from list_modules.models import ListModules


class Course(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    time_create = models.DateTimeField(auto_now_add=True, blank=True)
    time_update = models.DateTimeField(auto_now=True, blank=True)
    is_published = models.BooleanField(default=True, blank=True)
    category = models.ForeignKey("categories.Category", on_delete=models.PROTECT, null=True, blank=True)
    rating = models.IntegerField(default=0)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    price = models.IntegerField(default=0)
    student = models.ManyToManyField("students.Students", through="students.CourseStudent")
    teacher = models.ManyToManyField("teachers.Teachers", through="teachers.CourseTeacher")



    def __str__(self):
        return str(self.id)
