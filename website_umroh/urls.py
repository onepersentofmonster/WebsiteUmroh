
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import handler404, handler500
from django.conf.urls.static import static # new
from django.conf import settings # new

from . import views

urlpatterns = [
    path('blog/', include('blogs.urls')),
    path('paket-umroh/', include('packages.urls')),
    path('', views.index, name='index'),
    path('summernote/', include('django_summernote.urls')),
    path('admin/', admin.site.urls),
]

if settings.DEBUG: # new
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Administrasi Taufiq Harohmain Tobah ~ Tours & Travel"
admin.site.site_title = "TAUFIQ HT TOURS & TRAVEL"
handler404 = 'website_umroh.views.handler_404'
handler500 = 'website_umroh.views.handler_500'
