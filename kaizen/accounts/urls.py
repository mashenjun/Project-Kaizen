from django.conf.urls import url
from . import views

urlpatterns = [
    # /accounts/
    url(r'^login/', views.login_view, name='login'),
]