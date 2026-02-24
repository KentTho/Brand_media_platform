"""
Public Article API endpoints.
Why: JWT not required for read-only public (anonymous OK); generics for clean code.
Language switching with parler context for reduce bug in translations.
"""
from rest_framework.generics import ListAPIView, RetrieveAPIView
from parler.utils.context import switch_language
from django.utils.translation import gettext_lazy as _  # For i18n messages
from ..models import Article
from .serializers import ArticleListSerializer, ArticleDetailSerializer
from .pagination import StandardResultsSetPagination
from .filters import ArticleFilter
from .response import success_response, error_response

class ArticleListAPIView(ListAPIView):
    serializer_class = ArticleListSerializer
    pagination_class = StandardResultsSetPagination
    filterset_class = ArticleFilter  # Why: Use django_filters for validation/ordering

    def get_queryset(self):
        # Base queryset optimized (published only, soft delete filter)
        queryset = Article.objects.filter(status='published', deleted_at__isnull=True).select_related('category', 'author').prefetch_related('tags', 'topics')
        # Why: Prefetch to reduce queries (N+1 bug); extensible for more relations

        lang = self.request.query_params.get('lang', 'vi')  # Default vi
        switch_language(self.request, lang)  # Why: Parler-safe context switch; better than translation.activate for fallback

        return queryset

    def list(self, request, *args, **kwargs):
        try:
            response = super().list(request, *args, **kwargs)
            return success_response(response.data, _('Articles fetched successfully'))
        except Exception as e:  # Why: Basic error handling to reduce bug crashing API
            return error_response(_('Failed to fetch articles'), str(e), 500)

class ArticleDetailAPIView(RetrieveAPIView):
    serializer_class = ArticleDetailSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return Article.objects.filter(status='published', deleted_at__isnull=True).prefetch_related('related_products', 'tags', 'topics')

    def retrieve(self, request, *args, **kwargs):
        try:
            lang = request.query_params.get('lang', 'vi')
            switch_language(request, lang)
            response = super().retrieve(request, *args, **kwargs)
            return success_response(response.data, _('Article detail fetched successfully'))
        except Article.DoesNotExist:
            return error_response(_('Article not found'), status_code=404)
        except Exception as e:
            return error_response(_('Failed to fetch article'), str(e), 500)

