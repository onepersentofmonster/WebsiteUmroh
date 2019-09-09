from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin, SummernoteInlineModelAdmin
from .models import Package, Accommodation, TravelDetail

class TravelDetailInline(admin.TabularInline,SummernoteInlineModelAdmin):
    model = TravelDetail
    extra = 1

class AccommodationInline(admin.TabularInline,SummernoteInlineModelAdmin):
    model = Accommodation
    extra = 1


class PackageAdmin(SummernoteModelAdmin):
    summernote_fields = '__all__'
    inlines = [
        AccommodationInline,
        TravelDetailInline,
    ]

admin.site.register(Package,PackageAdmin)
