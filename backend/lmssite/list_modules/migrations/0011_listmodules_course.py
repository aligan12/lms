# Generated by Django 4.2.1 on 2023-07-31 09:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0004_course_price'),
        ('list_modules', '0010_alter_modules_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='listmodules',
            name='course',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='course.course'),
        ),
    ]