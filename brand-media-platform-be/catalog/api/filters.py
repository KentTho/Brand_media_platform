"""
Product filters (manual style like you).
Why: Simple, no extra dependency; easy to test and extend (add eco_score later).
"""

from django.db.models import Q


def filter_products(queryset, request):
    material_slug = request.query_params.get("material")
    featured = request.query_params.get("featured")
    search = request.query_params.get("search")

    if material_slug:
        queryset = queryset.filter(material__slug=material_slug)

    if featured == "true":
        queryset = queryset.filter(is_featured=True)

    if search:
        queryset = queryset.filter(
            Q(translations__name__icontains=search)
            | Q(translations__story__icontains=search)
            | Q(translations__description__icontains=search)
        ).distinct()

    return queryset
