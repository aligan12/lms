# Generated by Django 4.2.1 on 2023-07-15 16:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('admins', '0003_alter_admins_name_alter_admins_patronymic_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='admins',
            name='id',
        ),
        migrations.AlterField(
            model_name='admins',
            name='user',
            field=models.OneToOneField(blank=True, on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL),
        ),
    ]
