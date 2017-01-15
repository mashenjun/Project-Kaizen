from django import forms
from django.contrib.auth import (
    authenticate,
    get_user_model,
    login,
    logout,
)
from mongoengine.queryset import DoesNotExist
from .models import User

class UserLoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

    def clean(self):
        username = self.cleaned_data.get("username")
        password = self.cleaned_data.get("password")
        # auth
        user = User.objects(username = username)[0]
        if not user:
            raise forms.ValidationError("This user does not exist")
        if not user.password==password:
            raise forms.ValidationError("Incorrect password")
        if not user.is_active:
            raise forms.ValidationError("User is not longer active")
        return super(UserLoginForm,self).clean()