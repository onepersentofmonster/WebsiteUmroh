# Generated by Django 2.2 on 2019-09-24 14:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Description',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('header', models.CharField(blank=True, max_length=225, null=True)),
                ('dibuat_pada', models.DateTimeField(auto_now_add=True)),
                ('diperbarui_pada', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Home',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img_slider', models.ImageField(upload_to='home/img/')),
                ('dibuat_pada', models.DateTimeField(auto_now_add=True)),
                ('diperbarui_pada', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name_plural': 'home page',
                'ordering': ('id',),
            },
        ),
        migrations.CreateModel(
            name='ItemDescription',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('judul', models.CharField(max_length=225)),
                ('img', models.ImageField(blank=True, null=True, upload_to='home/description/item/img')),
                ('deskripsi', models.TextField(blank=True, null=True)),
                ('dibuat_pada', models.DateTimeField(auto_now_add=True)),
                ('diperbarui_pada', models.DateTimeField(auto_now=True)),
                ('deskripsi_dari', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='homes.Description')),
            ],
            options={
                'verbose_name_plural': 'items',
                'ordering': ('id',),
            },
        ),
    ]
