"""
Custom filtering logic for Article list endpoint.
Why: Hybrid approach - django_filters for extensible params (ordering, validation), custom function for complex Q queries.
Separated to keep views clean; easy to test unit, reduce bug in invalid params.
"""
import django_filters
from django.db.models import Q
from ..models import Article

class ArticleFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='category__slug')
    tag = django_filters.CharFilter(field_name='tags__slug')
    topic = django_filters.CharFilter(field_name='topics__slug')
    search = django_filters.CharFilter(method='filter_search')
    ordering = django_filters.OrderingFilter(
        fields=(
            ('published_at', 'published_at'),
            ('view_count', 'view_count'),
        )
    )  # Why: Support ?ordering=-published_at as per design; extensible to add more fields

    class Meta:
        model = Article
        fields = []

    def filter_search(self, queryset, name, value):
        # Why: Custom full-text search across translated fields; defensive (handle empty value to reduce bug)
        if not value:
            return queryset
        return queryset.filter(
            Q(translations__title__icontains=value) |
            Q(translations__excerpt__icontains=value) |
            Q(translations__content__icontains=value)
        ).distinct()