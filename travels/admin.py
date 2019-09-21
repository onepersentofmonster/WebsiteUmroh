from django.contrib import admin
from django.contrib.admin.widgets import FilteredSelectMultiple
from django_summernote.admin import SummernoteModelAdmin, SummernoteInlineModelAdmin
from rangefilter.filter import DateRangeFilter, DateTimeRangeFilter

from .models import *

class AirlineImageInline(admin.StackedInline):
    model = AirlineImage
    extra = 1

class HotelImageInline(admin.StackedInline):
    model = HotelImage
    extra = 1


class TravelImageInline(admin.StackedInline):
    model = TravelImage
    extra = 1


class TravelAccommodationInline(admin.TabularInline):
    model = TravelAccommodation
    extra = 1


class TravelFlightInline(admin.TabularInline):
    model = TravelFlight
    extra = 1


class TravelDetailInline(admin.StackedInline,SummernoteInlineModelAdmin):
    model = TravelDetail
    extra = 1


@admin.register(Travel)
class TravelAdmin(SummernoteModelAdmin):
    summernote_fields = '__all__'
    list_filter = (
        ('dibuat_pada', DateRangeFilter), ('diperbarui_pada', DateRangeFilter),
    )
    inlines = [
        TravelImageInline,
        TravelAccommodationInline,
        TravelFlightInline,
        TravelDetailInline,
    ]
    list_display = ('nama', 'kategori', 'label', 'harga', 'maskapai_penerbangan', 'hotel_akomodasi','author', 'dibuat_pada', 'diperbarui_pada')
    search_fields = ('nama',)

    def maskapai_penerbangan(self, obj):
        return '\n'.join([a.nama for a in obj.penerbangan.all()])
    
    def hotel_akomodasi(self, obj):
        return '\n'.join([a.nama for a in obj.akomodasi.all()])

    class Media:
        css = {
            'all': ('admin/css/multi-select.css',),
        }
        js = ('admin/js/jquery.multi-select.js', 'admin/js/myscript.js')


@admin.register(TravelCategory)
class CategoryAdmin(admin.ModelAdmin):
    list_filter = (
        ('dibuat_pada', DateRangeFilter), ('diperbarui_pada', DateRangeFilter),
    )
    list_display = ('nama', 'dibuat_pada', 'diperbarui_pada')
    search_fields = ('nama',)


@admin.register(TravelFacility)
class FacilityAdmin(admin.ModelAdmin):
    list_filter = (
        ('dibuat_pada', DateRangeFilter), ('diperbarui_pada', DateRangeFilter),
    )
    list_display = ('nama', 'dibuat_pada', 'diperbarui_pada')
    search_fields = ('nama',)


@admin.register(TravelHotel)
class HotelAdmin(admin.ModelAdmin):
    list_filter = (
        ('dibuat_pada', DateRangeFilter), ('diperbarui_pada', DateRangeFilter),
    )
    inlines = [
        HotelImageInline,
    ]
    list_display = ('nama', 'dibuat_pada', 'diperbarui_pada')
    search_fields = ('nama',)


@admin.register(TravelAirline)
class AirlineAdmin(admin.ModelAdmin):
    list_filter = (
        ('dibuat_pada', DateRangeFilter), ('diperbarui_pada', DateRangeFilter)
    )
    inlines = [
        AirlineImageInline,
    ]
    list_display = ('nama', 'dibuat_pada', 'diperbarui_pada')
    search_fields = ('nama',)
