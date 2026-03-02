from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Article, Category  # Thêm Category

User = get_user_model()


class ArticleModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",  # Required
            email="test@example.com",
            password="password123",
        )
        self.category = Category.objects.create(  # Thêm Category
            name="Test Category", slug="test-category"
        )

    def test_default_status(self):
        article = Article.objects.create(
            title="Test",
            content="Body",
            author=self.user,
            category=self.category,  # 🔥 FIX ở đây: Gán category
        )
        self.assertEqual(article.status, "draft")
