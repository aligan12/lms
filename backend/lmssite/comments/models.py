from datetime import date

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from custom_user.models import User


class Comments(models.Model):
    course = models.ForeignKey("course.Course", on_delete=models.CASCADE, null=True, blank=True)
    student = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    data = models.DateTimeField(auto_now=True, null=True, blank=True)
    text = models.TextField(blank=False, null=True)
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=0, blank=True)

    def __str__(self):
        return self.text
