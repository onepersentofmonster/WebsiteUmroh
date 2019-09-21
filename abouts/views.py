from django.shortcuts import render

from packages.models import PackageCategory
from travels.models import TravelCategory
from .models import *

def index(request):
    category_package = PackageCategory.objects.all()
    category_travel = TravelCategory.objects.all()

    abouts = About.objects.all()
    photos_activity = PhotosActivity.objects.all()
    context = {
        'abouts': abouts,
        'photos_activity': photos_activity,
        'category_package': category_package,
        'category_travel': category_travel,
    }
    template = 'abouts/index.html'
    return render(request,template,context)
