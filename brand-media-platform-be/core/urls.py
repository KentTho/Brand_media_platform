"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

# core/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Tùy chỉnh Admin Site
admin.site.site_header = "Brand Media Platform Admin"
admin.site.site_title = "BMP Admin Portal"
admin.site.index_title = "Welcome to Brand Media Editorial Board"

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/v1/", include([
        # Auth
        path("auth/", include("users.api.urls")),
        path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
        path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

        # Public content
        path("public/", include("content.api.urls")),
        path("public/catalog/", include("catalog.api.urls")),
        path("public/newsletter/", include("newsletter.api.urls")),
    ])),
]

# Serve media/static trong lúc dev
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)