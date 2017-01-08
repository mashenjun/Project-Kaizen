from django.conf.urls import url
from . import views

urlpatterns = [
    # /tesindex/
    url(r'^$', views.index, name='index'),
]