from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin, SummernoteInlineModelAdmin
from .models import Blog

class BlogAdmin(SummernoteModelAdmin):
    sumernote_fields = '__all__'
    list_display = ('judul', 'kategori', 'author', 'dibuat_pada', 'diperbarui_pada')
    search_fields = ['judul']


admin.site.register(Blog,BlogAdmin)
