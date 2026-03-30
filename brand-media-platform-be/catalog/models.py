from django.db import models
from parler.models import TranslatableModel, TranslatedFields


class Material(TranslatableModel):
    translations = TranslatedFields(
        name=models.CharField(max_length=200),
        description=models.TextField(),
        sustainability_report=models.TextField(
            blank=True, help_text="Chi tiết về tác động môi trường"
        ),
    )

    slug = models.SlugField(unique=True, db_index=True)
    eco_score = models.PositiveIntegerField(default=100, help_text="Điểm xanh (0-100)")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.safe_translation_getter("name", any_language=True)


class Product(TranslatableModel):
    translations = TranslatedFields(
        name=models.CharField(max_length=255),
        story=models.TextField(help_text="Câu chuyện sản phẩm (Storytelling)"),
        description=models.TextField(help_text="Thông số kỹ thuật"),
        specifications=models.JSONField(
            default=dict, blank=True
        ),  # Lưu size, màu dạng JSON
        seo_title=models.CharField(max_length=255, blank=True),
        seo_description=models.TextField(blank=True),
    )

    slug = models.SlugField(unique=True, db_index=True)
    # sku = models.CharField(max_length=50, unique=True, blank=True, null=True)  # Mã kho
    material = models.ForeignKey(
        Material, on_delete=models.PROTECT, related_name="products"
    )

    # Ảnh đại diện chính
    image = models.ImageField(upload_to="products/covers/")
    # Link Affiliate/Mua hàng (Quan trọng cho Brand Media)
    external_link = models.URLField(
        blank=True, help_text="Link mua hàng trên Shopee/Lazada/Web hãng"
    )
    # price_display = models.CharField(max_length=50, blank=True, help_text="Hiển thị giá (VD: 500.000đ)")

    is_featured = models.BooleanField(default=False, db_index=True)

    # Quan hệ 2 chiều với Article
    related_articles = models.ManyToManyField(
        "content.Article", blank=True, related_name="related_products"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.safe_translation_getter("name", any_language=True)


class ProductImage(models.Model):
    """Gallery ảnh cho sản phẩm"""

    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="gallery"
    )
    image = models.ImageField(upload_to="products/gallery/")
    alt_text = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)
