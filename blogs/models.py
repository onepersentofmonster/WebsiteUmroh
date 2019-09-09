from django.db import models
from django.utils import timezone
from multiselectfield import MultiSelectField


KATEGORI = (
    (1, 'Kategori 1'),
    (2, 'Kategori 2'),
)

class Blog(models.Model):
    judul = models.CharField(max_length=200)
    konten = models.TextField()
    kategori = MultiSelectField(choices=KATEGORI, default=KATEGORI[0][0])
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.judul