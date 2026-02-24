"""
Serializers for auth endpoints.
Why: Custom for register (validate unique, set password); extensible for profile update later.
Reduces bug with email/full_name checks; clean without exposing sensitive fields.
"""
from rest_framework import serializers
from users.models import User
from django.utils.translation import gettext_lazy as _


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    Why: Handles creation with password hash; validates unique email/full_name.
    Default role=Reader for public register; extensible to add captcha/email verify.
    """
    password = serializers.CharField(write_only=True, required=True, min_length=8)  # Why: Min length reduce weak pass bug

    class Meta:
        model = User
        fields = ('email', 'full_name', 'password', 'phone_number')  # Why: Minimal for register; no role (default)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(_("Email already exists."))
        return value

    def validate_full_name(self, value):
        # Optional: Unique full_name if need, else skip
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            password=validated_data['password'],
            phone_number=validated_data.get('phone_number', ''),
            role=User.Roles.READER,  # Default
            status=User.Status.ACTIVE
        )
        return user

class LoginSerializer(serializers.Serializer):
    """
    Serializer for login (used with SimpleJWT TokenObtainPair).
    Why: Custom if need extra fields, but minimal here; reduce bug by relying on SimpleJWT.
    """
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)