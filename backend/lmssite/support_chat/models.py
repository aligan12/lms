from django.db import models

from custom_user.models import User


class StudentTickets(models.Model):

    theme = models.CharField(max_length=100)
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=150, null=True)
    description = models.TextField( blank=True)
    answer = models.TextField( blank=True)
    completed = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now=True, null=True, blank=True)
    file = models.FileField(upload_to="files/", blank= True)

    def __str__(self):
        return self.title


class TeacherTickets(models.Model):
    Theme = [
        ("1", "Забыл пароль"),
        ("2", "Смена курса "),
        ("3", "Не работает "),
    ]
    theme = models.CharField(choices=Theme, default="3", max_length=1)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=150, null=True)
    description = models.TextField(blank=True)
    answer = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now=True, null=True, blank=True)
    file = models.FileField(upload_to="files/", blank=True)

    def __str__(self):
        return self.title


class AdminTickets(models.Model):
    Theme = [
        ("1", "Забыл пароль"),
        ("2", "Смена курса "),
        ("3", "Не работает "),
    ]
    theme = models.CharField(choices=Theme, default="3", max_length=1, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=150, null=True)
    description = models.TextField(blank=True)
    answer = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now=True, null=True, blank=True)
    file = models.FileField(upload_to="files/", blank=True)

    def __str__(self):
        return self.title


class UnauthorizedTickets(models.Model):
    Theme = [
        ("1", "Забыл пароль"),
        ("2", "Не могу войти "),
        ("3", "Не работает "),
    ]
    theme = models.CharField(choices=Theme, default="3", max_length=1, blank=True)
    title = models.CharField(max_length=150, null=True)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    email = models.EmailField(blank=True)
    date = models.DateTimeField(auto_now=True, null=True, blank=True)
    file = models.FileField(upload_to="files/", blank=True)

    def __str__(self):
        return self.title
