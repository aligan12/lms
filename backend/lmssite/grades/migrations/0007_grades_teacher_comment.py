# Generated by Django 4.2.1 on 2023-08-06 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('grades', '0006_grades_student_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='grades',
            name='teacher_comment',
            field=models.CharField(blank=True, default=None, max_length=300, null=True),
        ),
    ]
