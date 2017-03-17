from django.conf.urls import url
from . import views
from rest_framework_jwt.views import verify_jwt_token

urlpatterns = [
    # /accounts/,
    url(r'^api/login/', views.UserLoginAPIView.as_view(), name='api/login'),
    url(r'^api/register/', views.UserRegisterAPIView.as_view(), name='api/register'),
    url(r'^user/(?P<id>.+)/$', views.UserRetrieveView.as_view(), name='user-details'),
    url(r'^user/(?P<id>.+)/edit$$', views.UserEditView.as_view(), name='user-edit'),
    url(r'^api-token-verify/', verify_jwt_token, name='api/verify'),
    url(r'^api/captcha/$', views.captcha, name='api/captcha'),
    url(r'^api/test/$', views.TestView.as_view(), name='api/test'),
]