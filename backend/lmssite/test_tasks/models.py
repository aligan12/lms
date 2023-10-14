from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from custom_user.models import User


class TestTasks(models.Model):
    deadline_minute = models.IntegerField(null=True)
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    course = models.ForeignKey("course.Course", on_delete=models.CASCADE, null=True)
    questions = models.ManyToManyField("TestQuestionAnswer", blank=True)

    def __str__(self):
        return self.title


class TestQuestionAnswer(models.Model):
    question = models.TextField()
    options = models.ManyToManyField("TestAnswerOptions", blank=True)
    course = models.ForeignKey("course.Course", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title


class TestAnswerOptions(models.Model):
    option = models.TextField(null=True)
    course = models.ForeignKey("course.Course", on_delete=models.CASCADE, null=True)
    correct_answer = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class TestGrade(models.Model):
    test_task = models.OneToOneField("TestTasks", on_delete=models.CASCADE,null=True, blank=True)
    student = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    grade = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    data = models.DateTimeField(auto_now=True)
    course = models.ForeignKey("course.Course", on_delete=models.CASCADE, null=True, blank=True)
    list_modules = models.ForeignKey("list_modules.ListModules", on_delete=models.CASCADE, blank=True)
    is_late = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return self.title
