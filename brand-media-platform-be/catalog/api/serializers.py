"""
Product Public API serializers.
Why: TranslatableModelSerializer for auto multilingual; separate list/detail to optimize payload.
Extensible for Phase 2 (add price/variant later); reuses ArticleListSerializer for related_articles.
"""

from rest_framework import serializers
from parler_rest.serializers import TranslatableModelSerializer
from ..models import Product, Material
from content.api.serializers import ArticleListSerializer  # Reuse lightweight Article


class MaterialSerializer(TranslatableModelSerializer):
    class Meta:
        model = Material
        fields = ("slug", "name", "eco_score")


class ProductListSerializer(TranslatableModelSerializer):
    material = MaterialSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ("id", "slug", "name", "image", "is_featured", "material")


class ProductDetailSerializer(TranslatableModelSerializer):
    material = MaterialSerializer(read_only=True)
    related_articles = ArticleListSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "slug",
            "name",
            "story",
            "description",
            "specifications",
            "image",
            "external_link",
            "is_featured",
            "material",
            "related_articles",
            "created_at",
        )
