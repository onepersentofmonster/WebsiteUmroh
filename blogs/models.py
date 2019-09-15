from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from multiselectfield import MultiSelectField
from django.urls import reverse
from autoslug import AutoSlugField



KATEGORI = (
    ('kategori1', 'Kategori 1'),
    ('kategori2', 'Kategori 2'),
)

def blog_directory_path(instance, filename):
    return 'blog/{0}/{1}/{2}'.format(instance.author, instance.id, filename)

class Blog(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    banner = models.ImageField(upload_to=blog_directory_path, blank=True)
    judul = models.CharField(max_length=250)
    slug = AutoSlugField(populate_from='judul')
    konten = models.TextField(null=True, blank=True)
    kategori = models.CharField(choices=KATEGORI, max_length=10, default='kategori1')
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.judul

    def get_absolute_url(self):
        return reverse('detail', kwargs={'slug': self.slug})
