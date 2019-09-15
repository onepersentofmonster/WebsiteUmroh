from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin, SummernoteInlineModelAdmin
from rangefilter.filter import DateRangeFilter, DateTimeRangeFilter
from .models import Package, Accommodation, TravelDetail, PackageBanner, Flight

class TravelDetailInline(admin.StackedInline,SummernoteInlineModelAdmin):
    model = TravelDetail
    extra = 1

class AccommodationInline(admin.TabularInline,SummernoteInlineModelAdmin):
    model = Accommodation
    extra = 1

class FlightInline(admin.TabularInline,SummernoteInlineModelAdmin):
    model = Flight
    extra = 1

class PackageBannerInline(admin.StackedInline,SummernoteInlineModelAdmin):
    model = PackageBanner
    extra = 1

class PackageAdmin(SummernoteModelAdmin):
    summernote_fields = '__all__'
    list_filter = (
        ('dibuat_pada', DateRangeFilter), ('diperbarui_pada', DateTimeRangeFilter),
    )
    inlines = [
        PackageBannerInline,
        FlightInline,
        AccommodationInline,
        TravelDetailInline,
    ]
    list_display = ('nama', 'harga', 'kategori', 'kategori_lainnya', 'author', 'dibuat_pada')

admin.site.register(Package,PackageAdmin)
