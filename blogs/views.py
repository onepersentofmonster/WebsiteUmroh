from django.shortcuts import render,  get_object_or_404

from .models import Blog
from .filter import BlogFilter

def index(request):
    blog_list = Blog.objects.all()
    f = BlogFilter(request.GET, queryset=blog_list)
    template = 'blogs/index.html'
    context = {'filter': f}
    return render(request,template,context)

def detail(request, id, slug):
    blog = Blog.objects.get(slug__iexact = slug)
    f = BlogFilter(request.GET, queryset=Blog.objects.all())
    next_blog = Blog.objects.filter(id__gt=id)[:4]
    template = 'blogs/detail.html'
    context = {'blog': blog, 'filter': f, 'next_blog': next_blog}
    return render(request,'blogs/detail.html',context)
