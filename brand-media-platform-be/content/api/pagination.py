"""
Custom pagination for public APIs.
Why: Consistent response structure; easy to override per view/app for scalability.
"""

from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 50
