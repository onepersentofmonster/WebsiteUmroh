from django.contrib import admin

from .models import *

@admin.register(Home)
class HomeAdmin(admin.ModelAdmin):
    fields = ('img_slider',)
    list_display = ('img_slider', 'url_img', 'dibuat_pada', 'diperbarui_pada')

    def url_img(self, obj):
        return obj.img_slider.url
    