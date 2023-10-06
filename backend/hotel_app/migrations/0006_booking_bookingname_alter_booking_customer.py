# Generated by Django 4.2.5 on 2023-09-28 05:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('hotel_app', '0005_alter_booking_room'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='bookingname',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='booking',
            name='customer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
