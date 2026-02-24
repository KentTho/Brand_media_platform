# core/middleware.py (tạo file)
from django.utils import timezone
from content.models import Article, UserBehavior

class BehaviorTrackingMiddleware:
    """
    Middleware to track basic user behavior.
    Why: Auto-increment view_count and log 'view' action on article detail.
    Easy to extend for more actions (e.g., via signals or JS beacons).
    Reduces bug by handling anonymous users via session.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.path.startswith('/articles/') and request.method == 'GET':  # Assume URL pattern
            try:
                article_id = int(request.path.split('/')[-1])  # Edge case: validate ID
                article = Article.objects.get(id=article_id)
                article.view_count += 1
                article.save(update_fields=['view_count'])

                # Log behavior (anonymous OK via session)
                UserBehavior.objects.create(
                    user=request.user if request.user.is_authenticated else None,
                    session_key=request.session.session_key,
                    article=article,
                    action='view',
                    source=request.META.get('HTTP_REFERER', 'direct'),
                    device='mobile' if request.user_agent.is_mobile else 'desktop',
                    created_at=timezone.now()
                )
            except (ValueError, Article.DoesNotExist):
                pass  # Silent fail to reduce bug impact
        return response