from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.urls import reverse
from autoslug import AutoSlugField
from djmoney.models.fields import MoneyField



class TravelCategory(models.Model):
    nama = models.CharField(max_length=225)
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nama

    class Meta:
        ordering = ('nama',)
        verbose_name_plural = 'categories'  


class TravelFacility(models.Model):
    nama = models.CharField(max_length=225)
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nama

    class Meta:
        ordering = ('nama',)
        verbose_name_plural = 'facilities'


class TravelAirline(models.Model):
    nama = models.CharField(max_length=225)
    deskripsi = models.TextField(null=True, blank=True, help_text='Deskripsi airline / maskapai. Optional')
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nama
    
    class Meta:
        ordering = ('nama',)
        verbose_name_plural = 'airlines'


class AirlineImage(models.Model):
    airline = models.ForeignKey(TravelAirline, on_delete=models.CASCADE)
    img = models.ImageField(upload_to='travel/airline/img/', blank=True)
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Image %s - %s' % (self.id, self.airline.nama)

    class Meta:
        ordering = ('id',)


class TravelHotel(models.Model):
    nama = models.CharField(max_length=225)
    deskripsi = models.TextField(null=True, blank=True, help_text='Deskripsi hotel. Optional')
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nama

    class Meta:
        ordering = ('nama',)
        verbose_name_plural = 'hotel'


class HotelImage(models.Model):
    hotel = models.ForeignKey(TravelHotel, on_delete=models.CASCADE)
    img = models.ImageField(upload_to='travel/hotel/img/', blank=True)
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Image %s - %s' % (self.id, self.hotel.nama)

    class Meta:
        ordering = ('id',)


class Travel(models.Model):
    LABEL = [('populer', 'POPULER'),('promo', 'PROMO' )]
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='penulis')
    nama = models.CharField(max_length=250)
    kategori = models.ForeignKey(TravelCategory, on_delete=models.CASCADE)
    label = models.CharField(max_length=7, choices=LABEL, blank=True, help_text='Optional')
    harga = MoneyField(max_digits=14, decimal_places=2, default_currency='IDR')
    deskripsi = models.TextField(blank=True)
    fasilitas = models.ManyToManyField(TravelFacility, blank=True)
    penerbangan = models.ManyToManyField(TravelAirline, through='TravelFlight', blank=True)
    akomodasi = models.ManyToManyField(TravelHotel, through='TravelAccommodation', blank=True)
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)
    slug = AutoSlugField(populate_from='nama')

    def __str__(self):
        return self.nama

    def get_absolute_url(self):
        return reverse('detail', kwargs={'slug': self.slug})

    class Meta:
        ordering = ('id',)


class TravelImage(models.Model):
    paket = models.ForeignKey(Travel, on_delete=models.CASCADE)
    img = models.ImageField(upload_to='travel/img/', blank=True) 

    def __str__(self):
        return 'Gambar %s' % (self.id)

    class Meta:
        ordering = ('id',)
        verbose_name_plural = 'travel images'


class TravelFlight(models.Model):
    STATUS = [('berangkat', 'Berangkat'), ('kembali', 'Kembali')]
    paket = models.ForeignKey(Travel, on_delete=models.CASCADE)
    maskapai = models.ForeignKey(TravelAirline, on_delete=models.CASCADE, null=True, blank=True)
    status = models.CharField(choices=STATUS, max_length=9, null=True, blank=True, help_text='Status penerbangan berangkat / kembali. Optional')
    tanggal = models.DateField(null=True, blank=True, help_text='Tanggal penerbangan. Optional')

    def __str__(self):
        return '%s - %s' % (self.paket.nama, self.maskapai.nama)

    class Meta:
        ordering = ('paket',)
        verbose_name_plural = 'flights'


class TravelAccommodation(models.Model):
    paket = models.ForeignKey(Travel, on_delete=models.CASCADE)
    hotel = models.ForeignKey(TravelHotel, on_delete=models.CASCADE)
    mulai_tanggal = models.DateField(null=True, blank=True, help_text='Tanggal mulai penginapan. Optional')
    akhir_tanggal = models.DateField(null=True, blank=True, help_text='Tanggal akhir penginapan. Optional')
    
    def __str__(self):
        return '%s - %s' % (self.paket.nama, self.hotel.nama)

    class Meta:
        ordering = ('paket',)
        verbose_name_plural = 'accomodations'


class TravelDetail(models.Model):
    paket = models.ForeignKey(Travel, on_delete=models.CASCADE)
    perjalanan = models.CharField(max_length=250)
    img = models.ImageField(upload_to='travel/traveldetail/img', blank=True)
    deskripsi = models.TextField(blank=True)

    def __str__(self):
        return "Perjalan: %s" % (self.perjalanan)

    class Meta:
        ordering = ('id',)
