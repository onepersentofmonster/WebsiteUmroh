from django.db import models

# Create your models here.


class Home(models.Model):
    img_slider = models.ImageField(upload_to='home/img/')
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '%s' % (self.img_slider.url)

    def get_absolute_url(self):
        return ''

    class Meta:
        ordering = ('id',)
        verbose_name_plural = 'home page'


class Description(models.Model):
    header = models.CharField(max_length=225, null=True, blank=True)
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.header


class ItemDescription(models.Model):
    deskripsi_dari = models.ForeignKey(Description, on_delete=models.CASCADE)
    judul = models.CharField(max_length=225)
    img = models.ImageField(
        upload_to='home/description/item/img', null=True, blank=True)
    deskripsi = models.TextField(null=True, blank=True)
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '%s - %s' % (self.id, self.judul)

    class Meta:
        ordering = ('id',)
        verbose_name_plural = 'items'

