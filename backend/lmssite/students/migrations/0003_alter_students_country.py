# Generated by Django 4.2.1 on 2023-08-01 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0002_alter_coursestudent_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='students',
            name='country',
            field=models.CharField(blank=True, max_length=80, null=True),
        ),
    ]
