"""
Views for auth endpoints.
Why: Custom APIView for register (create user); use SimpleJWT built-ins for login/refresh.
Maintainable as separate from content; extensible to add forgot password/verify.
Reduces bug with validation and no expose pass.
"""
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, LoginSerializer
from users.api.response import success_response, error_response  # Assume shared response.py in project or copy
from django.utils.translation import gettext_lazy as _

class RegisterView(APIView):
    """
    View for user registration.
    Why: Public (AllowAny); creates user with default role; returns tokens immediately for seamless login.
    Extensible to send email verify; reduce bug with auth after create.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return error_response(_("Registration failed"), serializer.errors, status.HTTP_400_BAD_REQUEST)

        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {'email': user.email, 'full_name': user.full_name, 'role': user.role}
        }
        return success_response(data, _("User registered successfully"), status.HTTP_201_CREATED)

class LoginView(APIView):
    """
    Custom login view (alternative to TokenObtainPair if need extra logic).
    Why: Authenticate and return tokens; extensible for 2FA. But use SimpleJWT default for clean.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return error_response(_("Invalid credentials"), serializer.errors, 400)

        user = authenticate(email=serializer.validated_data['email'], password=serializer.validated_data['password'])
        if not user:
            return error_response(_("Invalid email or password"), status_code=401)

        refresh = RefreshToken.for_user(user)
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {'email': user.email, 'full_name': user.full_name, 'role': user.role}
        }
        return success_response(data, _("Login successful"))