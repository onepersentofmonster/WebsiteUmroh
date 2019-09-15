from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import pre_save
from django.utils import timezone
from django.urls import reverse
from autoslug import AutoSlugField
from multiselectfield import MultiSelectField
from djmoney.models.fields import MoneyField



FASILITAS = (
    (1, 'Tiket Pesawat PP'),
    (2, 'Hotel Madinah & Makkah, Makan 3x sehari'),
    (3, 'Transportasi Bus Full AC'),
    (4, 'Manasik Umroh Teori dan Praktik'),
    (5, 'Tour Leader & Mutawwif Profesional'),
    (6, 'City Tour Sesuai Program'),
    (7, 'Airport Handling'),
    (8, 'Air Zam-Zam'),
    (9, 'Perlengkapan Umroh Standar (Kain Ihram (pria), Mukena (wanita), Baju Seragam, Tas Troley/Koper, Hand Bag, Buku Manasik; label bagasi dll)'),
    (10, 'Biaya kelebihan bagasi (max 25 kg/orang)'),
    (11, 'Biaya pembuatan paspor dengan 3 suku kata'),
    (12, 'Biaya suntik meningitis dan atau flu'),
    (13, 'Pembuatan surat mahram (bagi yang memerlukan mahram)'),
    (14, 'Airport Tax Handling'),
    (15, 'Pengeluaran pribadi : kelebihan bagasi (max 25 kg/orang), telepon, laundry dll'),

)

HOTEL = [
    ('Madinah', (
            ('asaha', 'A Saha Hotel Madinah'),
            ('bahauddin', 'Bahauddin Hotel Madinah'),
            ('alharam', 'Al Haram Hotel Madinah'),
        )
    ),
    ('Makkah', (
            ('ajyadmakarem', 'Ajyad Makarem Hotel Makkah'),
            ('lemeriddien', 'Le Meriddien Hotel Makkah'),
            ('daralleman', 'Dar Al Leman Hotel Makkah'),
        )
    ),
    (None, 'Pilih Hotel'),
]

MASKAPAI = [
    ('etihad', 'Etihad'),('saudiarabia', 'Saudi Arabia'),
    ('emirates', 'Emirates'),('turish', 'Turish Airlines'),
    (None, 'Pilih Maskapai')
]

class Package(models.Model):
    NORMAL = 'N'
    POPULER = 'P'
    DISKON = 'D'
    REGULER = 'R'
    BISNIS = 'B'
    EKSEKUTIF = 'E'
    SEMINGGU = 'S'
    ARBAIN = 'A'
    CITYTOUR = 'C'
    KATEGORI = [
        (REGULER, 'REGULER'),
        (BISNIS, 'BISNIS'),
        (EKSEKUTIF, 'EKSEKUTIF'),
        (SEMINGGU, '12 HARI'),
        (ARBAIN, 'ARBAIN'),
        (CITYTOUR, 'CITY TOUR'),
    ]
    KATEGORI_LAINYA = [
        (NORMAL, 'NONE/NORMAL'),
        (POPULER, 'POPULER'),
        (DISKON, 'DISKON'),
    ]
    
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    nama = models.CharField(max_length=250)
    slug = AutoSlugField(populate_from='nama')
    kategori = models.CharField(max_length=1, choices=KATEGORI, default=REGULER)
    harga = MoneyField(max_digits=14, decimal_places=2, default_currency='IDR')
    deskripsi = models.TextField(blank=True)
    fasilitas = MultiSelectField(choices=FASILITAS)
    kategori_lainnya = models.CharField(max_length=1, choices=KATEGORI_LAINYA, default=NORMAL)
    dibuat_pada = models.DateField(auto_now_add=True)
    diperbarui_pada = models.DateField(auto_now=True)

    def __str__(self):
        return self.nama

    def get_absolute_url(self):
        return reverse('detail', kwargs={'slug': self.slug})

class PackageBanner(models.Model):
    paket = models.ForeignKey('Package', on_delete=models.CASCADE)
    banner = models.ImageField(upload_to='paket_umroh/banner/%Y/%m/%d', blank=True) 

    def __str__(self):
        return 'Gambar %s' % (self.id)

class Flight(models.Model):
    STATUS = [('berangkat', 'Berangkat'), ('kembali', 'Kembali'), (None, 'Unknown')]
    paket = models.ForeignKey('Package', on_delete=models.CASCADE)
    maskapai = models.CharField(choices=MASKAPAI, max_length=11)
    status = models.CharField(choices=STATUS, max_length=9)
    tanggal = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.maskapai

class Accommodation(models.Model):
    paket = models.ForeignKey('Package', on_delete=models.CASCADE)
    hotel = models.CharField(choices=HOTEL, max_length=12)
    mulai_tanggal = models.DateField(null=True, blank=True)
    akhir_tanggal = models.DateField(null=True, blank=True)
    

    def __str__(self):
        return self.hotel


def paket_travel_directory_path(instance, filename):
    return 'paket_umroh/{0}/{1}/{2}'.format(instance.paket.id, instance.id, filename)

class TravelDetail(models.Model):
    paket = models.ForeignKey('Package', on_delete=models.CASCADE)
    perjalanan = models.CharField(max_length=250)
    gambar = models.ImageField(upload_to=paket_travel_directory_path, blank=True)
    deskripsi = models.TextField(blank=True)

    def __str__(self):
        return "Perjalan: %s" % (self.perjalanan)
