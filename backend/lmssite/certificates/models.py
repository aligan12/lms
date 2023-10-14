from datetime import date

from django.db import models


class Certificates(models.Model):
    course = models.ForeignKey("course.Course", on_delete=models.CASCADE, null=True)
    student = models.ForeignKey("students.Students", on_delete=models.CASCADE)
    title = models.CharField(max_length=150, null=True)
    data = models.DateTimeField(auto_now_add=True, blank= True)
    file = models.FileField(upload_to="files/", blank= True)

    def __str__(self):
        return self.title
