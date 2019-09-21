from django.db import models
from django.contrib.auth.models import User
from django.utils.safestring import mark_safe
from django.template.defaultfilters import truncatechars
from django.urls import reverse
from autoslug import AutoSlugField

class About(models.Model):
    deskripsi = models.TextField()
    visi_misi = models.TextField(verbose_name='Visi & Misi', null=True, blank=True)
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def deskripsi_safe(self): 
        return truncatechars(mark_safe(self.deskripsi), 200)

    class Meta:
        ordering = ('id',)
        verbose_name_plural = 'About Us'

    def get_absolute_url(self):
        return '/tentang-kami/'

# class Partner(models.Model):
#     about = models.ForeignKey(About, on_delete=models.CASCADE)
#     img = models.ImageField(upload_to='about_us/img', null=True, blank=True, help_text='Icon/image mitra: eg. Garuda Indonesia, Saudi Arabia, Hotel Madinal, Hotel Makkah')
#     dibuat_pada = models.DateTimeField(auto_now_add=True)
#     diperbarui_pada = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return " %s - %s" % (self.id, self.img.url)

#     class Meta:
#         ordering = ('id',)

class Service(models.Model):
    STATUS = (
        ('termasuk', 'Termasuk'),
        ('tidaktermasuk', 'Tidak Termasuk'),
    )
    about = models.ForeignKey(About, on_delete=models.CASCADE)
    nama = models.CharField(max_length=225, null=True, blank=True, help_text='Biaya perjalanan termasuk/tidak-termasuk.')
    status = models.CharField(max_length=14, choices=STATUS)
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s - %s" % (self.id, self.nama)

    class Meta:
        ordering = ('id',)
        verbose_name_plural = ('services')

class PhotosActivity(models.Model):
    about = models.ForeignKey(About, on_delete=models.CASCADE)
    img = models.ImageField(upload_to='about_us/photos_of_activities', null=True, blank=True, help_text='Foto Kegiatan.')
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "%s - %s" % (self.id, self.img.url)

    class Meta:
        ordering = ('id',)
        verbose_name_plural = ('photos of activities')