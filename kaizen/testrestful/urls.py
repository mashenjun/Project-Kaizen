from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^employee/$', views.EmployeeView.as_view(), name='employee-list'),
    url(r'^uploadfile/$', views.UploadFileView.as_view(), name='uploadfile'),
    url(r'^uploadimage/$', views.UploadImageView.as_view(), name='uploadimage'),
]