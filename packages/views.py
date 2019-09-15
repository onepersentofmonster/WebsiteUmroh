from django.shortcuts import render,  get_object_or_404
from django.http import Http404

from .models import Package
from .filter import PackageFilter

def index(request):
    package_list = Package.objects.all()
    f = PackageFilter(request.GET, queryset=package_list)
    template = 'packages/index.html'
    context = {'filter': f}
    return render(request,template,context)

def detail(request, slug):
    package = get_object_or_404(Package, slug__iexact = slug)
    template = 'packages/detail.html'
    context = {'package': package}
    return render(request,template,context)
