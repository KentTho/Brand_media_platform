from django.utils.html import format_html


def image_preview(obj, field_name="image"):
    image = getattr(obj, field_name)
    if image:
        return format_html(
            '<img src="{}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" />',
            image.url,
        )
    return "-"
