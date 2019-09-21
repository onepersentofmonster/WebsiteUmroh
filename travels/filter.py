from django import forms
from django.db import models
import django_filters

from .models import Travel

class TravelFilter(django_filters.FilterSet):
    nama = django_filters.CharFilter(lookup_expr='icontains')
    dibuat_pada = django_filters.DateFromToRangeFilter()
    class Meta:
        model = Travel
        fields = ['nama', 'kategori', 'dibuat_pada']
        order_by = ['-id']