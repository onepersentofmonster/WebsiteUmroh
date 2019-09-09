from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin, SummernoteInlineModelAdmin
from .models import Blog
# Register your models here.
class BlogAdmin(SummernoteModelAdmin):
    sumernote_fields = '__all__'


admin.site.register(Blog,BlogAdmin)
