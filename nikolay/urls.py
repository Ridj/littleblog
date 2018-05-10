from django.contrib import admin
from django.urls import path, re_path
from littleblog import views

urlpatterns = [
    path('', views.index),
    path('admin/', admin.site.urls),
    path('about/', views.about),
    path('blog/', views.blog),
    path('blog/page/<int:page>', views.blog),
    path('blog/post/<int:blog_id>/', views.article),
    path('blog/post/<str:address>/', views.redirect),
    path('blog/<str:address>/', views.redirect),
    path('developers/', views.contacts),
    path('easteregg/', views.easteregg),
    path('index/', views.redirect),
    path('register/', views.registration),
    path('resume/', views.resume),
    re_path(r'^\w+', views.error)
]
