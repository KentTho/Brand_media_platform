from django.urls import path
from .views import RegisterView, LoginView
# SimpleJWT in main urls.py

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),  # Custom, or use token/ from main
    # Why: Clear paths; easy add forgot-password/
]