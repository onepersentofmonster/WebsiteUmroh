from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index-home'),
    path('cari/', views.SearchPackageList.as_view(), name='search_packages'),
]