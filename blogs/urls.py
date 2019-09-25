from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index-blog'),
    path('<slug:slug><int:id>/', views.detail, name='detail-blog'),
]