from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin, SummernoteInlineModelAdmin
from .models import *

class HeaderAdmin(admin.ModelAdmin):
    fields = ('judul', 'img')
    list_display = ('judul', 'img', 'dibuat_pada', 'diperbarui_pada')
    search_fields = ('judul',)

class CategoryAdmin(admin.ModelAdmin):
    fields = ('nama',)
    list_display = ('nama', 'dibuat_pada', 'diperbarui_pada')
    search_fields = ('nama',)

class BlogAdmin(SummernoteModelAdmin):
    sumernote_fields = '__all__'
    list_display = ('judul', 'kategori', 'author', 'dibuat_pada', 'diperbarui_pada')
    search_fields = ('judul',)

admin.site.register(Header, HeaderAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Blog, BlogAdmin)
