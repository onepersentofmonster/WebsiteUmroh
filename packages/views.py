from django.shortcuts import render,  get_object_or_404
from django.http import Http404

from .models import Package, PackageCategory
from .filter import PackageFilter

from travels.models import TravelCategory

def index(request):
    packages = Package.objects.all()
    category_package = PackageCategory.objects.all()
    f = PackageFilter(request.POST, queryset=packages)

    category_travel = TravelCategory.objects.all()
    template = 'packages/index.html'
    context = {
        'filter': f,
        'category_package': category_package,
        'category_travel': category_travel
    }
    return render(request,template,context)

def detail(request, slug):
    package = get_object_or_404(Package, slug__iexact = slug)
    category_package = PackageCategory.objects.all()
    category_travel = TravelCategory.objects.all()
    template = 'packages/detail.html'
    context = {
        'package': package,
        'category_package': category_package,
        'category_travel': category_travel,
    }
    return render(request,template,context)
