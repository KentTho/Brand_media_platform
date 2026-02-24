"""
Unified API response format for public endpoints.
Why: Keeps frontend contract stable across versions; functions for easy reuse in any view,
reducing bug in inconsistent responses. Extensible to add meta (e.g., pagination info) later.
"""
from rest_framework.response import Response

def success_response(data=None, message="Success"):
    return Response({
        "success": True,
        "message": message,
        "data": data,
        "errors": None
    })

def error_response(message="Error", errors=None, status_code=400):
    return Response({
        "success": False,
        "message": message,
        "data": None,
        "errors": errors
    }, status=status_code)