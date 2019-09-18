from django.contrib import admin

from .models import *


class SosmedImageInline(admin.StackedInline):
    model = SosmedImage
    extra = 1

@admin.register(Home)
class HomeAdmin(admin.ModelAdmin):
    fields = ('img_slider',)
    list_display = ('img_slider', 'url_img', 'dibuat_pada', 'diperbarui_pada')

    def url_img(self, obj):
        return obj.img_slider.url

@admin.register(Sosmed)
class SosmedAdmin(admin.ModelAdmin):
    inlines = [
        SosmedImageInline,
    ]
    list_display = ('username', 'dibuat_pada', 'diperbarui_pada')
    