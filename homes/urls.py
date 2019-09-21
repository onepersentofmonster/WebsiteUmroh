from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index-home'),
    path('paket/', views.SearchPackageList.as_view(), name='search_packages'),
    path('travel/', views.SearchTravelList.as_view(), name='search_travels'),
]