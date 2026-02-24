from django.contrib import admin

# Register your models here.
# content/admin

from django.contrib import admin
from parler.admin import TranslatableAdmin
from .models import Category, Tag, Topic, Article, UserBehavior, Comment  # Import all relevant models

class BaseTranslatableAdmin(TranslatableAdmin):
    """
    Base admin for translatable models like Category, Tag, Topic.
    Why: To reuse common configurations (e.g., slug prepopulation, name getter)
    and make it easy to extend for similar models in the future.
    """
    def get_prepopulated_fields(self, request, obj=None):
        return {'slug': ('name',)}  # Handle slug from translatable name

    def get_name(self, obj):
        # Fallback if no translation (reduce bug in display)
        return obj.safe_translation_getter('name', any_language=True) or "(No name)"
    get_name.short_description = 'Tên'

@admin.register(Category)
class CategoryAdmin(BaseTranslatableAdmin):
    list_display = ('get_name', 'slug', 'parent', 'created_at')
    search_fields = ('translations__name', 'translations__description')
    list_filter = ('parent',)

@admin.register(Tag)
class TagAdmin(BaseTranslatableAdmin):
    list_display = ('get_name', 'slug', 'created_at')
    search_fields = ('translations__name',)

@admin.register(Topic)
class TopicAdmin(BaseTranslatableAdmin):
    list_display = ('get_name', 'slug', 'is_featured', 'created_at')
    list_filter = ('is_featured',)

# Inline classes for Article
class ArticleTagInline(admin.TabularInline):
    """
    Inline for Article tags.
    Why: To allow easy addition/removal of tags without leaving the Article form.
    """
    model = Article.tags.through
    extra = 1
    verbose_name = "Tag"
    verbose_name_plural = "Tags"

class ArticleTopicInline(admin.TabularInline):
    """
    Inline for Article topics.
    Why: Similar to tags, for better editor workflow.
    """
    model = Article.topics.through
    extra = 1
    verbose_name = "Topic"
    verbose_name_plural = "Topics"

@admin.register(Article)
class ArticleAdmin(TranslatableAdmin):
    """
    Admin for Article model.
    Why: Central hub for content management, with SEO focus and read-only metrics
    to prevent accidental edits and ensure data integrity.
    """
    list_display = ('get_title', 'author', 'category', 'status', 'is_featured', 'published_at', 'view_count')
    list_filter = ('status', 'category', 'topics', 'is_featured', 'author')
    search_fields = ('translations__title', 'translations__excerpt', 'translations__content')
    readonly_fields = ('view_count', 'reading_time', 'created_at', 'updated_at')

    inlines = [ArticleTagInline, ArticleTopicInline]

    fieldsets = (
        ('Nội dung (Translatable)', {'fields': ('title', 'excerpt', 'content')}),
        ('SEO & Slug', {'fields': ('seo_title', 'seo_description', 'slug')}),
        ('Media', {'fields': ('cover_image',)}),
        ('Phân loại', {'fields': ('author', 'category', 'status', 'is_featured', 'published_at')}),
        ('Metrics (Read-only)', {'fields': ('view_count', 'reading_time')}),
    )

    def get_prepopulated_fields(self, request, obj=None):
        return {'slug': ('title',)}  # Slug from translatable title

    def get_title(self, obj):
        return obj.safe_translation_getter('title', any_language=True) or "(No title)"
    get_title.short_description = 'Tiêu đề'

@admin.register(UserBehavior)
class UserBehaviorAdmin(admin.ModelAdmin):
    """
    Admin for UserBehavior (analytics data).
    Why: Read-only to protect raw data; no add/delete to avoid manual tampering.
    """
    list_display = ('user', 'article', 'action', 'device', 'created_at')
    list_filter = ('action', 'device', 'created_at')
    search_fields = ('article__translations__title',)
    readonly_fields = [f.name for f in UserBehavior._meta.fields]
    list_per_page = 50
    date_hierarchy = 'created_at'

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False