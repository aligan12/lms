# Generated by Django 4.2.1 on 2023-08-04 11:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('file_tasks', '0006_filetasksanswer_module_index'),
    ]

    operations = [
        migrations.AddField(
            model_name='filetasksanswer',
            name='answer',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]
