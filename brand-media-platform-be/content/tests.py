# content/tests.py
from django.test import TestCase
from .models import Article


class ArticleModelTest(TestCase):
    """
    Tests for Article model.
    Why: Ensure relations and defaults work, reduce future bugs.
    """

    def test_default_status(self):
        article = Article.objects.create(title="Test", content="Body")
        self.assertEqual(article.status, "draft")  # Check default
