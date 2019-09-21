
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import handler404, handler500
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('tentang-kami/', include('abouts.urls')),
    path('travel/', include('travels.urls')),
    path('blog/', include('blogs.urls')),
    path('paket/', include('packages.urls')),
    path('', include('homes.urls')),
    path('summernote/', include('django_summernote.urls')),
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Administrasi Taufiq Harohmain Tobah"
admin.site.site_title = "TAUFIQ HT TOURS & TRAVEL"
handler404 = 'website_umroh.views.handler_404'
handler500 = 'website_umroh.views.handler_500'
