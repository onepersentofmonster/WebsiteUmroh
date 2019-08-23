
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import handler404, handler500
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('admin/', admin.site.urls),
]

handler404 = 'website_umroh.views.handler_404'
handler500 = 'website_umroh.views.handler_500'
