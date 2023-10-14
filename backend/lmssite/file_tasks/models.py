import datetime

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.datetime_safe import date

from custom_user.models import User


class FileTasks(models.Model):
    title = models.CharField(max_length=200, null=True)
    description = models.TextField(blank=True)
    course = models.ForeignKey("course.Course", on_delete=models.CASCADE, null=True)
    file = models.FileField(upload_to='files/', null=True, blank=True)

    def __str__(self):
        return str(self.id)


class FileTasksAnswer(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    data = models.DateTimeField(auto_now=True, blank=True)
    file = models.FileField(upload_to='files/', null=True, blank=True)
    description= models.TextField()
    course = models.ForeignKey("course.Course", on_delete=models.CASCADE, null=True)
    list_modules = models.OneToOneField("list_modules.ListModules", on_delete=models.CASCADE, blank=True)
    module_index = models.IntegerField()
    is_late = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)


class FileTasksGrade(models.Model):
    file_task = models.OneToOneField("FileTasks", on_delete=models.CASCADE, null=True, blank=True)
    student = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    grade = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)], default=0, blank=True)
    data = models.DateTimeField(auto_now=True, blank=True)
    course = models.ForeignKey("course.Course", on_delete=models.CASCADE, null=True)
    comment = models.TextField(null=True)

    def __str__(self):
        return self.grade
