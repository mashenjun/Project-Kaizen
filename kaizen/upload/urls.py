from django.conf.urls import url

from . import views

urlpatterns = [
    # /upload/
    url(r'^uploader/$', views.CreateUploaderView.as_view(), name='uploader-create-list'),
    url(r'^getphoto/(?P<name>.+)/$',views.uploader_photo_view,name='get-photo'),
]