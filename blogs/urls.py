from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<slug:slug>101<int:id>/', views.detail, name='detail-blog'),
]