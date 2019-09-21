from django.shortcuts import render
from django.http import Http404
from django.views.generic import ListView
from django.db.models import Q

from homes.models import Home
from packages.models import Package, PackageCategory
from travels.models import Travel, TravelCategory

from blogs.models import Blog

def index(request):
    home = Home.objects.all()

    packages = Package.objects.all()
    package_populer = packages.filter(label__exact='populer') if packages else False
    category_package = PackageCategory.objects.all()

    travels = Travel.objects.all()
    category_travel = TravelCategory.objects.all()

    blog = Blog.objects.all()
    blog_filter = blog.filter(id__lt=blog.last().id) if blog else False

    template = 'index.html'
    context = {
        'home': home,
        'packages': packages,
        'category_package': category_package,
        'package_populer': package_populer,
        'travels': travels,
        'category_travel': category_travel,
        'blog': blog, 
        'blog_filter': blog_filter
    }
    return render(request,template,context)


class SearchPackageList(ListView):
    model = Package

    def get_queryset(self):
        kategori = self.request.POST.get('paket_kategori')
        start = self.request.POST.get('dibuat_pada_after')
        end = self.request.POST.get('dibuat_pada_before')
        if not dibuat_pada_after:
            search_packages = Package.objects.filter(kategori=kategori)
            return search_packages
        else:
            search_packages = Package.objects.filter(
                Q(kategori__exact=kategori), Q(dibuat_pada__range=(start,end))
            )
            return search_packages


class SearchTravelList(ListView):
    model = Travel

    def get_queryset(self):
        kategori = self.request.GET.get('travel_kategori')
        start = self.request.GET.get('dibuat_pada_after')
        end = self.request.GET.get('dibuat_pada_before')
        if not dibuat_pada_after:
            search_travel = Travel.objects.filter(kategori=kategori)
            return search_travel
        else:
            search_travel = Travel.objects.filter(
                Q(kategori__exact=kategori), Q(dibuat_pada__range=(start,end))
            )
            return search_travels
