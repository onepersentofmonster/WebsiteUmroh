from django.shortcuts import render
from django.views.defaults import page_not_found, server_error
from django.http import Http404

def index(request):
    return render(request,'index.html')


def handler_404(request, exception=None):
    return page_not_found(request, exception, template_name="errors/404.html")

def handler_500(request):
    return server_error(request, template_name="errors/500.html")