from django.db import models
from django.utils import timezone


class Blog(models.Model):
    author = models.CharField(max_length=20)
    content = models.TextField()
    created = models.DateTimeField(default=timezone.now)
    modified = models.DateTimeField(blank=True, null=True)
    name = models.CharField(max_length=30)
    theme = models.CharField(max_length=20)


class Deleted(models.Model):
    """
    Backup for deleted blog articles
    """
    author = models.CharField(max_length=20)
    content = models.TextField()
    created = models.DateTimeField()
    deleted = models.DateTimeField(default=timezone.now)
    name = models.CharField(max_length=30)
    theme = models.CharField(max_length=20)


class Comment(models.Model):
    article = models.ForeignKey(Blog, on_delete=models.CASCADE)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=30, default='Аноним')
