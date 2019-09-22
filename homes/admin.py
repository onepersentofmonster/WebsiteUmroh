from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin, SummernoteInlineModelAdmin

from .models import *


class ItemDescriptionInline(admin.StackedInline, SummernoteInlineModelAdmin):
    model = ItemDescription
    extra = 1


@admin.register(Home)
class HomeAdmin(admin.ModelAdmin):
    fields = ('img_slider',)
    list_display = ('id', 'img_slider', 'url_img',
                    'dibuat_pada', 'diperbarui_pada')

    def url_img(self, obj):
        return obj.img_slider.url


"""@admin.register(PromoPop)
class PromoPopAdmin(admin.ModelAdmin):
    fields = ('img_slider',)
    list_display = ('id', 'img_slider', 'url_img',
                    'dibuat_pada', 'diperbarui_pada')

    def url_img(self, obj):
        return obj.img_slider.url"""


@admin.register(Description)
class DescriptionAdmin(SummernoteModelAdmin):
    summernote_fields = '__all__'
    list_display = ('id', 'header', 'dibuat_pada', 'diperbarui_pada')

    inlines = [
        ItemDescriptionInline,
    ]
