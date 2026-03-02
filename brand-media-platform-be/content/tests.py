from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Article

User = get_user_model()


class ArticleModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="test@example.com", password="password123"
        )

    def test_default_status(self):
        article = Article.objects.create(
            title="Test", content="Body", author=self.user  # 🔥 FIX ở đây
        )

        self.assertEqual(article.status, "draft")
