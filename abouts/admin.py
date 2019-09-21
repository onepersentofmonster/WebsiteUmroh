from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin

from .models import *

class PhotosActivityInline(admin.StackedInline):
    model = PhotosActivity
    extra = 1

class ServiceInline(admin.TabularInline):
    model = Service
    extra = 1

@admin.register(About)
class AboutAdmin(SummernoteModelAdmin):
    sumernote_fields = '__all__'
    list_display = ('deskripsi_safe', 'dibuat_pada', 'diperbarui_pada')
    inlines = [
        PhotosActivityInline,
        ServiceInline,
    ]

