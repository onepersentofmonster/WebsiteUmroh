from django import forms
from django.db import models
import django_filters

from .models import Blog

class BlogFilter(django_filters.FilterSet):
    judul = django_filters.CharFilter(lookup_expr='icontains')
    class Meta:
        model = Blog
        fields = ['judul', 'kategori']
        order_by = ['-dibuat_pada']
        