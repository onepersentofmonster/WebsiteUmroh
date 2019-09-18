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


class Sosmed(models.Model):
    username = models.CharField(max_length=225)
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

    class Meta:
        ordering = ('id',)
        verbose_name_plural = 'Instagram'


class SosmedImage(models.Model):
    sosmed = models.ForeignKey(Sosmed, on_delete=models.CASCADE)
    img = models.ImageField(upload_to='home/sosmed/img/')
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)    

    def __str__(self):
        return 'Image %s - %s' % (self.id, self.sosmed)
    
    class Meta:
        ordering = ('id',)
