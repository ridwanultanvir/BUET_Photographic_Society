# Generated by Django 4.0.6 on 2022-08-14 22:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('buetpx', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='subheader',
        ),
    ]