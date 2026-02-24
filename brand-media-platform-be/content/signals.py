# content/signals.py
from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Article
import re  # For word count

@receiver(pre_save, sender=Article)
def calculate_reading_time(sender, instance, **kwargs):
    """
    Auto-calculate reading time before saving.
    Why: Ensure consistency (assume 200 words/min), reduce bug from manual input.
    """
    if instance.content:  # Edge case: empty content
        word_count = len(re.findall(r'\w+', instance.content))
        instance.reading_time = max(1, word_count // 200)  # Min 1 min
    else:
        instance.reading_time = 0