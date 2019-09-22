from django.shortcuts import render,  get_object_or_404
from datetime import date

from .models import Blog, Header, Category
from .filter import BlogFilter

from packages.models import PackageCategory
from travels.models import TravelCategory


def index(request):
    blog_banner = Header.objects.all()
    blogs = Blog.objects.all()
    f = BlogFilter(request.GET, queryset=blogs)
    category = Category.objects.all()
    today = date.today()

    category_package = PackageCategory.objects.all()
    category_travel = TravelCategory.objects.all()
    template = 'blogs/index.html'
    context = {
        'blog_banner': blog_banner,
        'blogs': blogs,
        'filter': f,
        'category': category,
        'today': today,
        'category_package': category_package,
        'category_travel': category_travel
    }
    return render(request, template, context)


def detail(request, id, slug):
    blogs = Blog.objects.all()
    blog = Blog.objects.get(slug__iexact=slug)
    f = BlogFilter(request.GET, queryset=Blog.objects.all())
    next_blog = Blog.objects.filter(id__gt=id)[:4]
    category = Category.objects.all()
    today = date.today()

    category_package = PackageCategory.objects.all()
    category_travel = TravelCategory.objects.all()
    template = 'blogs/detail.html'
    context = {
        'blogs': blogs,
        'blog': blog,
        'filter': f,
        'next_blog': next_blog,
        'category': category,
        'today': today,
        'category_package': category_package,
        'category_travel': category_travel
    }
    return render(request, template, context)

    def get_absolute_url(self):
        from django.core.urlresolvers import reverse
        return reverse('index')
