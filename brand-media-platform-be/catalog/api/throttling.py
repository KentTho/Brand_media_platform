from rest_framework.throttling import SimpleRateThrottle

class TrackingRateThrottle(SimpleRateThrottle):
    """
    Custom throttle cho Tracking API.
    Why: Giới hạn spam nhưng vẫn cho user thực tế (200/hour).
    Extensible: Dễ thay đổi rate sau.
    """
    scope = 'tracking'

    def get_cache_key(self, request, view):
        if request.user.is_authenticated:
            return f'throttle:tracking:user:{request.user.id}'
        return f'throttle:tracking:ip:{self.get_ident(request)}'