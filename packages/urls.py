from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index-package'),
    path('<slug:slug>/', views.detail, name='detail'),
]