from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser, UserManager as BaseUserManager
from django.db import models
from parler.models import TranslatableModel, TranslatedFields
from parler.managers import TranslatableManager


class UserManager(BaseUserManager, TranslatableManager):
    """
    Custom manager for User model.
    Why: Combines Django's UserManager (for auth features like create_user) with Parler's TranslatableManager
    to support multilingual querying, preventing QuerySet inheritance errors in TranslatableAdmin.
    This makes the model extensible for more translated fields without breaking auth.
    """
    pass

class User(AbstractUser, TranslatableModel):
    # Định nghĩa Choices rõ ràng hơn
    class Roles(models.TextChoices):
        ADMIN = 'admin', 'Admin'
        EDITOR = 'editor', 'Editor'
        CONTRIBUTOR = 'contributor', 'Contributor'
        READER = 'reader', 'Reader'

    class Status(models.TextChoices):
        ACTIVE = 'active', 'Active'
        INACTIVE = 'inactive', 'Inactive'
        BANNED = 'banned', 'Banned'

    # Trường dịch (Chỉ để những thứ cần dịch thực sự)
    translations = TranslatedFields(
        bio=models.TextField(blank=True, verbose_name="Tiểu sử")
    )

    # Trường thực tế (Nên để ngoài bảng dịch để query nhanh)
    full_name = models.CharField(max_length=255, verbose_name="Họ và tên")
    email = models.EmailField(unique=True, db_index=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    role = models.CharField(
        max_length=20,
        choices=Roles,
        default=Roles.READER
    )
    status = models.CharField(
        max_length=15,
        choices=Status,
        default=Status.ACTIVE
    )

    avatar = models.ImageField(upload_to='avatars/%Y/%m/', null=True, blank=True)
    is_verified = models.BooleanField(default=False)  # Xác thực tài khoản

    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name']  # Bắt buộc khi tạo qua CLI

    def __str__(self):
        return f"{self.full_name} ({self.role})"