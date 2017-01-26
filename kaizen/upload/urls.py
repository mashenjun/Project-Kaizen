from django.conf.urls import url

from . import views

urlpatterns = [
    # /upload/
    url(r'^uploader/$', views.CreateUploaderView.as_view(), name='uploader-create-list'),
]