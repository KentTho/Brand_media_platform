# brand_media_platform_be/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "api/v1/",
        include(
            [
                path("auth/", include("users.api.urls")),  # Auth endpoints
                path("public/", include("content.api.urls")),  # Public content
                # ... (add others later)
                path(
                    "auth/token/",
                    TokenObtainPairView.as_view(),
                    name="token_obtain_pair",
                ),
                path(
                    "auth/token/refresh/",
                    TokenRefreshView.as_view(),
                    name="token_refresh",
                ),
            ]
        ),
    ),
    path(
        "api/v1/public/",
        include(
            [
                path("", include("content.api.urls")),  # Article + Tracking
                path("catalog/", include("catalog.api.urls")),  # Products
                # ...
            ]
        ),
    ),
    # Why: Versioning /v1/ for extensibility; easy to add /v2/ later without breaking
]
