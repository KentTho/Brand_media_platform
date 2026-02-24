from django.db import models


class NewsletterSubscriber(models.Model):
    STATUS_CHOICES = (
        ('active', 'Subscribed'),
        ('unsubscribed', 'Unsubscribed'),
        ('bounced', 'Bounced'),  # Email chết/không gửi được
    )

    email = models.EmailField(unique=True, db_index=True)
    full_name = models.CharField(max_length=100, blank=True)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    source = models.CharField(max_length=100, blank=True, help_text="Đăng ký từ Footer hay Popup?")

    is_verified = models.BooleanField(default=False)  # Double Opt-in

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.email} ({self.status})"