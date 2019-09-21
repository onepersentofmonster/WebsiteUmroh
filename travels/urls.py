from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index-travel'),
    path('<slug:slug>/', views.detail, name='detail-travel'),
]