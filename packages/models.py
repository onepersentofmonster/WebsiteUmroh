from django.db import models
from django.utils import timezone
from multiselectfield import MultiSelectField


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

HOTEL = (
    (1, 'A Saha - Madinah'),
    (2, 'Bahauddin - Madinah'),
    (3, 'Al Haram - Madinah'),
    (4, 'Ajyad Makarem - Makkah'),
    (5, 'Le Meriddien - Makkah'),
    (6, 'Dar Al Leman - Makkah'),
)

PESAWAT = (
    (1, 'Etihad'),
    (2, 'Saudi Arabia'),
    (3, 'Emirates'),
    (4, 'Turish Airlines'),
)

class Package(models.Model):
    banner = models.FileField(upload_to='paket_umroh/%Y/%m/%d', blank=True)
    nama = models.CharField(max_length=100)
    deskripsi = models.TextField()
    fasilitas = MultiSelectField(choices=FASILITAS)
    populer = models.BooleanField(default=False)
    dibuat_pada = models.DateTimeField(auto_now_add=True)
    diperbarui_pada = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Paket umroh %s' % (self.nama)

class Accommodation(models.Model):
    paket = models.ForeignKey('Package', on_delete=models.CASCADE)
    hotel = MultiSelectField(choices=HOTEL, max_choices=2)
    pesawat = MultiSelectField(choices=PESAWAT, max_choices=2)

class TravelDetail(models.Model):
    paket = models.ForeignKey('Package', on_delete=models.CASCADE)
    perjalanan = models.CharField(max_length=100)
    deskripsi = models.TextField(blank=True)
