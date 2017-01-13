from django.conf.urls import include,url
from django.views.generic.edit import CreateView
from django.contrib.auth.forms import UserCreationForm

urlpatterns = [
    # /registration/
    url('^register/', CreateView.as_view(
        template_name='register.html',
        form_class=UserCreationForm,
        success_url='/'
    )),
    url('^accounts/', include('django.contrib.auth.urls')),
]