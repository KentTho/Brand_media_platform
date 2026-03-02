"""
Serializer for tracking user behavior events.
Why: Non-model Serializer to strictly control writable fields; validates minimal structured data.
Extensible for more actions/fields (e.g., product_slug in Phase 2); reduces bug with choices and bounds.
"""

from rest_framework import serializers
from content.models import UserBehavior, Article
from django.utils.translation import gettext_lazy as _


class UserBehaviorSerializer(serializers.Serializer):
    """
    Input validator for behavior tracking.
    Why: Intentional non-ModelSerializer to prevent exposing/allowing unwanted fields; clean with explicit validation.
    """

    article = serializers.SlugField(required=True)  # Required for core linking
    action = serializers.ChoiceField(choices=UserBehavior.ACTION_CHOICES, required=True)

    scroll_depth = serializers.IntegerField(
        min_value=0, max_value=100, required=False, default=0
    )  # Why: Bounds to reduce invalid data bug
    time_spent = serializers.IntegerField(min_value=0, required=False, default=0)

    meta_data = serializers.JSONField(
        required=False, default=dict
    )  # Why: Flexible for AI extras (e.g., {'highlight_text': '...'})

    def validate_article(self, value):
        # Why: Ensure published article exists; defensive to prevent logging junk data (reduce bug)
        try:
            return Article.objects.get(
                slug=value, status="published", deleted_at__isnull=True
            )
        except Article.DoesNotExist:
            raise serializers.ValidationError(_("Invalid or unpublished article slug."))
