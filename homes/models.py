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
