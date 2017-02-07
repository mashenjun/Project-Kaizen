from django.conf.urls import url

from . import views

# testrestful/
urlpatterns = [
    url(r'^employee/$', views.EmployeeView.as_view(), name='employee-list'),
    url(r'^uploadfile/$', views.UploadFileView.as_view(), name='uploadfile'),
    url(r'^uploadimage/$', views.UploadImageView.as_view(), name='uploadimage'),
    url(r'^hello/(?P<name>.+)/$',views.hello_world, name='hello-world')
]