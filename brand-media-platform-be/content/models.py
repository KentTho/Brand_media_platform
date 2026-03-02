from django.db import models
from django.conf import settings
from django.utils import timezone
from parler.models import TranslatableModel, TranslatedFields


# Hàm định danh đường dẫn ảnh để quản lý file gọn gàng
def article_image_path(instance, filename):
    return f'articles/{instance.created_at.strftime("%Y/%m")}/{filename}'


class Category(TranslatableModel):
    translations = TranslatedFields(
        name=models.CharField(max_length=255, verbose_name="Tên danh mục"),
        description=models.TextField(blank=True, verbose_name="Mô tả"),
        seo_title=models.CharField(max_length=255, blank=True),  # SEO chuyên sâu
        seo_description=models.TextField(blank=True),
    )
    slug = models.SlugField(unique=True, db_index=True, allow_unicode=True)
    # Hỗ trợ danh mục cha-con (VD: Sống Xanh -> Tái chế)
    parent = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="children",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.safe_translation_getter("name", any_language=True)


class Tag(TranslatableModel):
    translations = TranslatedFields(
        name=models.CharField(max_length=100),
    )
    slug = models.SlugField(unique=True, allow_unicode=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.safe_translation_getter("name", any_language=True)


class Topic(TranslatableModel):
    """Topic rộng hơn Tag, dùng để gom nhóm chủ đề lớn"""

    translations = TranslatedFields(
        name=models.CharField(max_length=255), description=models.TextField(blank=True)
    )
    slug = models.SlugField(unique=True)
    is_featured = models.BooleanField(default=False)  # Topic nổi bật trang chủ
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.safe_translation_getter("name", any_language=True)


class Article(TranslatableModel):
    STATUS_CHOICES = (
        ("draft", "Draft"),
        ("review", "Review"),
        ("published", "Published"),
        ("archived", "Archived"),
    )

    translations = TranslatedFields(
        title=models.CharField(max_length=255),
        excerpt=models.TextField(help_text="Đoạn tóm tắt hiển thị trên Card"),
        content=models.TextField(),  # Sau này tích hợp CKEditor
        seo_title=models.CharField(max_length=255, blank=True),
        seo_description=models.TextField(blank=True),
    )

    slug = models.SlugField(
        unique=True, max_length=255, allow_unicode=True, db_index=True
    )
    cover_image = models.ImageField(upload_to=article_image_path)
    reading_time = models.PositiveIntegerField(help_text="Minutes", default=0)
    view_count = models.PositiveIntegerField(
        default=0, db_index=True
    )  # Index để sort nhanh
    is_featured = models.BooleanField(default=False)

    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="draft", db_index=True
    )

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="articles"
    )

    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, related_name="articles"
    )
    topics = models.ManyToManyField(Topic, blank=True, related_name="articles")
    tags = models.ManyToManyField(Tag, blank=True, related_name="articles")

    published_at = models.DateTimeField(null=True, blank=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Soft delete: Không xóa thật sự để giữ dữ liệu
    deleted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-published_at"]  # Mặc định lấy bài mới nhất

    def __str__(self):
        return self.safe_translation_getter("title", any_language=True)


class UserBehavior(models.Model):
    """Bảng vàng cho AI Data Scientist"""

    ACTION_CHOICES = (
        ("view", "View"),
        ("scroll", "Scroll"),
        ("like", "Like"),
        ("save", "Save"),
        ("share", "Share"),
        ("click_product", "Click Product"),  # Tracking click vào sản phẩm
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True
    )
    session_key = models.CharField(
        max_length=40, null=True, blank=True, db_index=True
    )  # Cho user vãng lai
    article = models.ForeignKey(
        Article, on_delete=models.CASCADE, related_name="behaviors"
    )

    action = models.CharField(max_length=20, choices=ACTION_CHOICES, db_index=True)

    # Dữ liệu định lượng
    scroll_depth = models.IntegerField(default=0, help_text="% trang đã đọc")
    time_spent = models.IntegerField(default=0, help_text="Số giây on-site")

    # Dữ liệu ngữ cảnh
    source = models.CharField(
        max_length=50, blank=True, help_text="Đến từ FB, Google, Email..."
    )
    device = models.CharField(max_length=50, blank=True)  # Mobile/Desktop

    # JSONField: Lưu trữ linh hoạt cho AI (Ví dụ: đoạn text user highlight, tọa độ click...)
    meta_data = models.JSONField(default=dict, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)


class Comment(models.Model):
    article = models.ForeignKey(
        Article, on_delete=models.CASCADE, related_name="comments"
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # Hỗ trợ trả lời comment (Nested Comment)
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="replies"
    )

    content = models.TextField()
    is_approved = models.BooleanField(
        default=True
    )  # Tùy chính sách, thường là True rồi lọc sau
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]
