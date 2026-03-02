from .base import *

DEBUG = True

ALLOWED_HOSTS = ["*"]

STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
    }
}
