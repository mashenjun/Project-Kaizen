"""kaizen URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Pastebin API')
from rest_framework_jwt.views import obtain_jwt_token

router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
# router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    # url(r'^', include(router.urls)),
    url(r'^', include('pages.urls')),
    url(r'^pages/', include('pages.urls')),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', admin.site.urls),
    url(r'^testconnect/', include('testconnect.urls')),
    url(r'^testindex/', include('testindex.urls')),
    url(r'^testrestful/', include('testrestful.urls')),
    # url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^accounts/', include('accounts.urls')),
    # url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^registration/', include('registration.urls')),
    url(r'upload/', include('upload.urls')),
]

urlpatterns += [
    url(r'^captcha/', include('captcha.urls')),
    url(r'^api-docs/', schema_view)
]


