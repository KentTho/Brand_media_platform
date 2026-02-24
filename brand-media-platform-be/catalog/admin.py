from django.contrib import admin

# Register your models here.
# catalog/admin

from django.contrib import admin
from parler.admin import TranslatableAdmin
from .models import Material, Product, ProductImage

# Reuse BaseTranslatableAdmin if defined in content, or define here
class BaseTranslatableAdmin(TranslatableAdmin):
    def get_prepopulated_fields(self, request, obj=None):
        return {'slug': ('name',)}

    def get_name(self, obj):
        return obj.safe_translation_getter('name', any_language=True) or "(No name)"
    get_name.short_description = 'Tên'

class ProductImageInline(admin.TabularInline):
    """
    Inline for Product images.
    Why: Gallery management directly in Product form for efficient workflow.
    """
    model = ProductImage
    extra = 1
    fields = ('image', 'alt_text', 'order')
    ordering = ('order',)

@admin.register(Material)
class MaterialAdmin(BaseTranslatableAdmin):
    """
    Admin for Material model.
    Why: Focus on eco_score for green branding, with multilingual support.
    """
    list_display = ('get_name', 'eco_score', 'created_at')
    list_filter = ('eco_score',)
    search_fields = ('translations__name',)

@admin.register(Product)
class ProductAdmin(BaseTranslatableAdmin):
    """
    Admin for Product model.
    Why: Emphasize storytelling and relations for soft-commerce phase.
    """
    list_display = ('get_name', 'material', 'is_featured', 'created_at')
    list_filter = ('material', 'is_featured')
    search_fields = ('translations__name', 'translations__story')
    filter_horizontal = ('related_articles',)
    inlines = [ProductImageInline]

    fieldsets = (
        ('Thông tin (Translatable)', {'fields': ('name', 'story', 'description', 'specifications')}),
        ('Media', {'fields': ('image',)}),
        ('Quan hệ', {'fields': ('material', 'related_articles', 'external_link')}),
        ('Khác', {'fields': ('is_featured', 'slug')}),
    )