from django.db import models
from django.contrib.auth.models import User
from multiselectfield import MultiSelectField
from django.urls import reverse
from autoslug import AutoSlugField


class Header(models.Model):
    judul = models.CharField(max_length=250)
    img = models.ImageField(upload_to='blog/img/banner/', blank=True)
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.judul

    class Meta:
        ordering = ['diperbarui_pada']
        verbose_name_plural = 'blog headers'


class Category(models.Model):
    nama = models.CharField(max_length=250)
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nama

    class Meta:
        ordering = ('nama',)
        verbose_name_plural = 'blog categories'


class Blog(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='penulis')
    img = models.ImageField(upload_to='blog/img/article/', blank=True)
    judul = models.CharField(max_length=250)
    slug = AutoSlugField(populate_from='judul', unique=True, always_update=True)
    konten = models.TextField(null=True, blank=True)
    kategori = models.ForeignKey(Category, on_delete=models.CASCADE)
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.judul

    def get_absolute_url(self):
        return reverse('detail-blog', kwargs={'slug': self.slug, 'id': self.id})

    class Meta:
        ordering = ('judul',)
