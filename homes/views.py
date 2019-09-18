from django.shortcuts import render
from django.http import Http404
from django.views.generic import ListView
from django.db.models import Q

from homes.models import Home
from packages.models import Package, Category
from blogs.models import Blog

def index(request):
    home = Home.objects.all()
    package = Package.objects.all()
    category_package = Category.objects.all()
    blog = Blog.objects.all()
    package_populer = package.filter(label__exact='populer') if package else False
    blog_filter = blog.filter(id__lt=blog.last().id) if blog else False
    template = 'index.html'
    context = {
        'home': home,
        'package': package,
        'category_package': category_package, 
        'blog': blog, 
        'blog_filter': blog_filter
    }
    return render(request,template,context)


class SearchPackageList(ListView):
    model = Package

    def get_queryset(self):
        kategori = self.request.GET.get('kategori')
        m_tanggal = self.request.GET.get('m_tanggal')
        a_tanggal = self.request.GET.get('a_tanggal')
        if not m_tanggal:
            search_packages = Package.objects.filter(kategori=kategori)
            return search_packages
        else:
            search_packages = Package.objects.filter(
                Q(kategori__contains=kategori), Q(flight__tanggal__range=(m_tanggal,a_tanggal))
            )
            return search_packages
