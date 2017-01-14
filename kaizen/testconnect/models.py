from __future__ import unicode_literals

from django.db import models
from mongoengine import *
# Create your models here.
class Employee(Document):
    email = StringField(required=True)
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)

class Student(models.Model):
    email = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)