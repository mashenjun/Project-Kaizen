from django.shortcuts import render

# Create your views here.
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from register.forms.register import RegistrationForm
from django.views.decorators import csrf

def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        # TODO: do the registration to database
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/accounts/register/complete')
    else:
        form = RegistrationForm()

    token = {}
    # token.update(csrf(request))
    token['form'] = form

    return render_to_response('register/registration_form.html', token)

def registration_complete(request):
    return render_to_response('register/registration_complete.html')