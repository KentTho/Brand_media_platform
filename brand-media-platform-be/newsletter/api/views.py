from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from .serializers import NewsletterSerializer
from content.api.response import success_response, error_response
from django.utils.translation import gettext_lazy as _

class NewsletterSubscribeView(APIView):
    """
    Endpoint cho phép người dùng đăng ký nhận bản tin (Newsletter).
    Mục tiêu: Thu thập lead khách hàng tiềm năng.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = NewsletterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return success_response(
                data=serializer.data,
                message=_("Cảm ơn bạn đã đăng ký nhận bản tin của chúng tôi!")
            )
        return error_response(
            message=_("Đăng ký không thành công"),
            errors=serializer.errors,
            status_code=status.HTTP_400_BAD_REQUEST
        )
