from rest_framework import serializers
from ..models import NewsletterSubscriber


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ("email", "full_name", "source")

    def validate_email(self, value):
        if NewsletterSubscriber.objects.filter(email=value, status="active").exists():
            raise serializers.ValidationError("Email này đã đăng ký nhận bản tin rồi.")
        return value
