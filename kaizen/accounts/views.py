from django.shortcuts import render

from django.contrib import messages
from .forms import UserLoginForm
# Create your views here.

def login_view(request):
    form = UserLoginForm(request.POST or None)
    if form.is_valid():
        username = form.cleaned_data.get("username")
        password = form.cleaned_data.get("password")
    return render(request,"accounts/test_login.html",{"form":form})

def register_view(request):
    return render(request,"form.html",{})

def logout_view(request):
    return render(request,"form.html",{})