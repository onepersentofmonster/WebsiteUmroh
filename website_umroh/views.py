from django.shortcuts import render
from django.views.defaults import page_not_found, server_error

def handler_404(request, exception=None):
    template = 'errors/404.html'
    return page_not_found(request, exception, template_name=template)

def handler_500(request):
    template = 'errors/500.html'
    return server_error(request, template_name=template)