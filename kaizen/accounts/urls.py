from django.conf.urls import url
from . import views
from rest_framework_jwt.views import verify_jwt_token

urlpatterns = [
    # /accounts/
    url(r'^login/', views.login_view, name='login'),
    url(r'^api/login/', views.UserLoginAPIView.as_view(), name='api/login'),
    url(r'^api-token-verify/', verify_jwt_token, name='api/verify'),
]