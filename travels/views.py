from django.shortcuts import render,  get_object_or_404
from django.http import Http404

from .models import Travel, TravelCategory
from .filter import TravelFilter

from packages.models import PackageCategory

def index(request):
    travels = Travel.objects.all()
    category_travel = TravelCategory.objects.all()
    f = TravelFilter(request.GET, queryset=travels)

    category_package = PackageCategory.objects.all()
    template = 'travels/index.html'
    context = {
        'filter': f,
        'category_travel': category_travel,
        'category_package': category_package,
    }
    return render(request,template,context)

def detail(request, slug):
    travel = get_object_or_404(Travel, slug__iexact = slug)
    template = 'travels/detail.html'
    context = {'travel': travel}
    return render(request,template,context)
