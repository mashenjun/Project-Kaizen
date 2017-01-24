from __future__ import unicode_literals
from mongoengine import *
# Create your models here.

class UploadFile(Document):
    file = FileField()
    # file = StringField()

class UploadImage(Document):
    image = ImageField()



















