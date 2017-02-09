from django.conf.urls import url
from . import views
from rest_framework_jwt.views import verify_jwt_token

urlpatterns = [
    # /accounts/
    url(r'^login/', views.login_view, name='login'),
    url(r'^api/login/', views.UserLoginAPIView.as_view(), name='api/login'),
    url(r'^api/register/', views.UserRegisterAPIView.as_view(), name='api/register'),
    url(r'^api-token-verify/', verify_jwt_token, name='api-verify'),
    url(r'^api/captcha/$', views.captcha, name='api-captcha'),
    url(r'^api/test/$', views.TestView.as_view(), name='api-test'),
]