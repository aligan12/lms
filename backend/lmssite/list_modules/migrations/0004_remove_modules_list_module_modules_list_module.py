# Generated by Django 4.2.1 on 2023-07-22 03:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('list_modules', '0003_modules'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='modules',
            name='list_module',
        ),
        migrations.AddField(
            model_name='modules',
            name='list_module',
            field=models.ManyToManyField(to='list_modules.listmodules'),
        ),
    ]
