# content/api/urls.py
from django.urls import path
from .views import ArticleListAPIView, ArticleDetailAPIView

urlpatterns = [
    path('articles/', ArticleListAPIView.as_view(), name='article-list'),
    path('articles/<str:slug>/', ArticleDetailAPIView.as_view(), name='article-detail'),
    # Why: Clear naming; easy to add more endpoints (e.g., categories/) later
]