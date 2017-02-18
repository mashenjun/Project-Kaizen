# -*- coding: utf-8 -*-

import datetime
from mongoengine import *
from accounts.models import User


# Create your models here.

SEX = (('M', 'Male'),
        ('F', 'Female'),)

CATALOGUE = (('GA',"民间游戏"),
        ('ST',"传说/故事"),
        ('SO',"儿歌/童谣"),
        ('TO',"玩意/把式"),
        ('SP',"地方特色"),)

TYPR = ()


class Uploader(Document):
    user = ReferenceField(User,required=True,dbref=False)
    name = StringField()
    birth_day = DateTimeField()
    sex = StringField(max_length=1, choices=SEX)
    photo = ImageField(content_type='image/png')
    # type = StringField(max_length=2, choices=TYPE)
    home_town = StringField()
    location = PointField()

class Comment(EmbeddedDocument):
    content = StringField()
    owner = ReferenceField(User,required=True,dbref=False)
    created_datetime = DateTimeField(default=datetime.datetime.now())

class Post(Document):
    title = StringField(max_length=200,required=True)
    catalogue = StringField(max_length=10,)
    type = StringField(max_length=10,)
    author = ReferenceField(Uploader,required=True,dbref=False)
    comment = EmbeddedDocumentListField(document_type=Comment)

    meta = {'allow_inheritance': True}


class TextPost(Post):
    content = StringField()

class ImagePost(Post):
    link_url = URLField()

class VideoPost(Post):
    link_url = URLField()

