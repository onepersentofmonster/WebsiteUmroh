from django.shortcuts import render
from django.views.defaults import page_not_found, server_error
from django.http import Http404
from django.views.generic import ListView
from django.db.models import Q

from packages.models import Package 

def index(request):
    package = Package.objects.all()
    template = 'index.html'
    context = {'package': package}
    return render(request,template,context)


class SearchPackageList(ListView):
    model = Package

    def get_queryset(self):
        kategori = self.request.GET.get('kategori')
        m_tanggal = self.request.GET.get('m_tanggal')
        a_tanggal = self.request.GET.get('a_tanggal')
        if not m_tanggal:
            search_packages = Package.objects.filter(Q(kategori__contains=kategori))
            return search_packages
        else:
            search_packages = Package.objects.filter(
                Q(kategori__contains=kategori), Q(flight__tanggal__range=(m_tanggal,a_tanggal))
            )
            return search_packages

def handler_404(request, exception=None):
    template = 'errors/404.html'
    return page_not_found(request, exception, template_name=template)

def handler_500(request):
    template = 'errors/500.html'
    return server_error(request, template_name=template)