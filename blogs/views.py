from django.shortcuts import render,  get_object_or_404
from datetime import date

from .models import Blog, Header, Category
from .filter import BlogFilter

def index(request):
    blog_banner = Header.objects.all()
    blog_list = Blog.objects.all()
    f = BlogFilter(request.GET, queryset=blog_list)
    category = Category.objects.all()
    today = date.today()

    template = 'blogs/index.html'
    context = {
        'blog_banner': blog_banner, 
        'blog_list': blog_list, 
        'filter': f,
        'category': category, 
        'today': today
    }
    return render(request,template,context)

def detail(request, id, slug):
    blog = Blog.objects.get(slug__iexact = slug)
    f = BlogFilter(request.GET, queryset=Blog.objects.all())
    next_blog = Blog.objects.filter(id__gt=id)[:4]
    template = 'blogs/detail.html'
    context = {'blog': blog, 'filter': f, 'next_blog': next_blog}
    return render(request,template,context)

    def get_absolute_url(self):
        from django.core.urlresolvers import reverse
        return reverse('index')
