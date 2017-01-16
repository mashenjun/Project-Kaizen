from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^employee/$', views.EmployeeView.as_view(), name='employee-list'),
]