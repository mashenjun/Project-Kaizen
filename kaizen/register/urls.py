from django.conf.urls import url

from . import views

urlpatterns = [

    url(r'^accounts/register/$', views.register, name='register'),
    url(r'^accounts/register/complete/$', views.registration_complete, name='registration_complete'),

]