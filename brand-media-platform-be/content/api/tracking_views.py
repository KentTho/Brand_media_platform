"""
Tracking API endpoint.
Why: Append-only event logging system; write-heavy design with no updates/deletes.
Handles anon/authenticated; extensible to async (e.g., Celery) for high scale (1M events/day).
"""

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.utils import timezone
from content.models import UserBehavior
from .tracking_serializers import UserBehaviorSerializer
from .response import success_response, error_response
from django.utils.translation import gettext_lazy as _


class TrackUserBehaviorAPIView(APIView):
    """
    Public endpoint for recording user interaction events.
    Why: APIView for custom POST (append-only); JWT optional (link user if auth, else session).
    Basic anti-spam and auto-detection for clean data; maintainable as separate view for tracking logic.
    """

    permission_classes = [
        AllowAny
    ]  # Why: Public for anon tracking; extensible to IsAuthenticated for sensitive actions

    def post(self, request):
        serializer = UserBehaviorSerializer(data=request.data)
        if not serializer.is_valid():
            return error_response(_("Invalid tracking payload"), serializer.errors, 400)

        validated_data = serializer.validated_data
        article = validated_data.pop("article")
        action = validated_data["action"]

        # Handle user/anon (reduce bug if no auth)
        user = request.user if request.user.is_authenticated else None
        session_key = request.session.session_key or None  # Fallback None if no session

        # Basic anti-spam (soft guard against duplicates/spam)
        recent_event_exists = UserBehavior.objects.filter(
            user=user,
            session_key=session_key,
            article=article,
            action=action,
            created_at__gte=timezone.now()
            - timezone.timedelta(seconds=5),  # Adjustable threshold
        ).exists()
        if recent_event_exists:
            return success_response(message=_("Event ignored (potential duplicate)"))

        # Auto-detect fields (override if sent, but prefer server-side for accuracy)
        source = request.data.get("source", request.META.get("HTTP_REFERER", "direct"))
        device = request.data.get(
            "device", "mobile" if request.user_agent.is_mobile else "desktop"
        )  # Needs django-user-agents for advanced

        # Create event (append-only)
        UserBehavior.objects.create(
            user=user,
            session_key=session_key,
            article=article,
            action=action,
            scroll_depth=validated_data.get("scroll_depth", 0),
            time_spent=validated_data.get("time_spent", 0),
            source=source[:50],  # Truncate to model max_length, reduce bug
            device=device[:50],
            meta_data=validated_data.get("meta_data", {}),
            created_at=timezone.now(),  # Auto timestamp for AI timeline analysis
        )

        return success_response(message=_("Event recorded successfully"))
