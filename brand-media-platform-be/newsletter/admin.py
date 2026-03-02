# Register your models here.
# newsletter/admin

from django.contrib import admin
from .models import NewsletterSubscriber


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    """
    Admin for NewsletterSubscriber.
    Why: Marketing data management with filters for sources; actions for bulk updates
    to handle unsubscribes efficiently without bugs.
    """

    list_display = (
        "email",
        "full_name",
        "status",
        "source",
        "created_at",
        "is_verified",
    )
    list_filter = ("status", "source", "is_verified")
    search_fields = ("email", "full_name")
    date_hierarchy = "created_at"
    actions = ["mark_as_unsubscribed"]

    def mark_as_unsubscribed(self, request, queryset):
        # Bulk update with validation (reduce bug: only update if active)
        queryset.filter(status="active").update(status="unsubscribed")

    mark_as_unsubscribed.short_description = "Đánh dấu unsubscribe"
