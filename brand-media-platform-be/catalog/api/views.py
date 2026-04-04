"""
Product Public API views.
Why: Same pattern as Article API for consistency; manual filter (your style) + prefetch/select_related.
Multilingual with ?lang=; response wrapper reused but matches your count/results style.
"""

from django.views.decorators.vary import vary_on_headers
from rest_framework.generics import ListAPIView, RetrieveAPIView
from parler.utils.context import switch_language
from django.utils.translation import gettext_lazy as _
from ..models import Product
from .serializers import ProductListSerializer, ProductDetailSerializer
from .filters import filter_products
from content.api.pagination import StandardResultsSetPagination  # Reuse
from content.api.response import success_response, error_response
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page


@method_decorator(cache_page(60 * 10), name="dispatch")  # Cache 10 phút
@method_decorator(
    vary_on_headers("Accept-Language"), name="dispatch"
)  # Cache riêng theo lang
class ProductListAPIView(ListAPIView):
    serializer_class = ProductListSerializer
    pagination_class = (
        StandardResultsSetPagination  # Optional – you can remove if want manual count
    )

    def get_queryset(self):
        queryset = (
            Product.objects.select_related("material")
            .prefetch_related("related_articles")
            .all()
        )
        queryset = filter_products(queryset, self.request)  # Your filter logic
        lang = self.request.query_params.get("lang", "vi")
        switch_language(self.request, lang)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            data = {
                "count": self.paginator.page.paginator.count,
                "results": serializer.data,
            }
        else:
            serializer = self.get_serializer(queryset, many=True)
            data = {"count": queryset.count(), "results": serializer.data}
        return success_response(data, _("Products fetched successfully"))


class ProductDetailAPIView(RetrieveAPIView):
    serializer_class = ProductDetailSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Product.objects.select_related("material").prefetch_related(
            "related_articles"
        )

    def retrieve(self, request, *args, **kwargs):
        lang = request.query_params.get("lang", "vi")
        switch_language(request, lang)
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return success_response(
                {"data": serializer.data}, _("Product detail fetched successfully")
            )
        except Product.DoesNotExist:
            return error_response(_("Product not found"), status_code=404)
