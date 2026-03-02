from django.contrib import admin

# Register your models here.
# user/admin

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# from parler.admin import TranslatableAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(BaseUserAdmin):
    """
    Custom admin for User model.
    Why: To provide a user-friendly interface for managing roles and statuses,
    while ensuring multilingual support and preventing edits to timestamps.
    Handles non-translated fields like full_name correctly to avoid query errors.
    """

    list_display = ("email", "get_full_name", "role", "status", "is_staff", "is_active")
    list_filter = ("role", "status", "is_staff", "is_active")
    search_fields = (
        "email",
        "full_name",
    )  # Fix: Use 'full_name' (non-translated field); remove 'translations__' to avoid field not found bug
    ordering = ("email",)

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Personal info (Translatable)",
            {"fields": ("full_name", "bio", "avatar")},
        ),  # Group full_name here even if not translated
        ("Role & Status", {"fields": ("role", "status", "is_verified")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "updated_at")}),
    )

    readonly_fields = ("last_login", "updated_at")
    filter_horizontal = (
        "groups",
        "user_permissions",
    )  # Easier management for many-to-many fields

    def get_full_name(self, obj):
        # Fix: Use direct field access since full_name is not translated; fallback to email (edge case: empty full_name)
        return obj.full_name or obj.email

    get_full_name.short_description = "Họ và tên"
