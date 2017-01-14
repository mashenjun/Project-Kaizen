from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from mongoengine import *
from datetime import datetime
# Create your models here.


# class User(AbstractBaseUser):
#     """
#     Custom user class.
#     """
#     email = models.EmailField('email address', unique=True, db_index=True)
#     joined = models.DateTimeField(auto_now_add=True)
#     is_active = models.BooleanField(default=True)
#     is_admin = models.BooleanField(default=False)
#
#     USERNAME_FIELD = 'email'
#
#     def __unicode__(self):
#         return self.email


class User(Document):
    email = EmailField('email address', unique=True, db_index=True)
    password1 = StringField()
    password2 = StringField()
    joined = DateTimeField(default=datetime.now)
    is_active = BooleanField(default=True)
    is_admin = BooleanField(default=False)
