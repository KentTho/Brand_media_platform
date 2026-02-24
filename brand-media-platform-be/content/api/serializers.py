"""
Serializers for public Article API.
Why: Use parler_rest for auto multilingual (reduce bug in manual getters); avoid deep nesting for performance.
Designed readable with explicit fields; extensible to add versions (e.g., v2 with more data).
"""
from rest_framework import serializers
from parler_rest.serializers import TranslatableModelSerializer, TranslatedFieldsField
from ..models import Article, Category, Tag, Topic, UserBehavior
from catalog.models import Product  # Why: Soft link for Phase 2 prep, but lightweight to avoid heavy queries

class CategorySerializer(TranslatableModelSerializer):
    class Meta:
        model = Category
        fields = ('slug', 'name')  # Auto translated via parler_rest

class TagSerializer(TranslatableModelSerializer):
    class Meta:
        model = Tag
        fields = ('slug', 'name')

class TopicSerializer(TranslatableModelSerializer):
    class Meta:
        model = Topic
        fields = ('slug', 'name')

class RelatedProductSerializer(TranslatableModelSerializer):
    class Meta:
        model = Product
        fields = ('slug', 'name', 'image')  # Lightweight for soft-selling

class ArticleListSerializer(TranslatableModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    topics = TopicSerializer(many=True, read_only=True)
    author = serializers.StringRelatedField()  # Why: Simple author display (full_name or email)

    class Meta:
        model = Article
        fields = (
            'slug', 'title', 'excerpt', 'cover_image', 'published_at',
            'reading_time', 'view_count', 'category', 'tags', 'topics',
            'is_featured', 'author'
        )  # Why: Optimized for list (no content); explicit to reduce bug exposing extra fields

class ArticleDetailSerializer(TranslatableModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    topics = TopicSerializer(many=True, read_only=True)
    related_products = RelatedProductSerializer(many=True, read_only=True)
    author = serializers.StringRelatedField()

    class Meta:
        model = Article
        fields = (
            'slug', 'title', 'excerpt', 'content', 'cover_image', 'seo_title',
            'seo_description', 'reading_time', 'view_count', 'published_at',
            'category', 'tags', 'topics', 'is_featured', 'related_products',
            'author'
        )  # Why: Full detail without __all__ (secure, avoid exposing deleted_at etc.)

