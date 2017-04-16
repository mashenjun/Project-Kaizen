# -*- coding: utf-8 -*-

import datetime
from mongoengine import *
from accounts.models import User


# Create your models here.

SEX = (('M', 'Male'),
        ('F', 'Female'),)

CATALOGUE = (('GA',u"民间游戏"),
        ('ST',u"传说/故事"),
        ('SO',u"儿歌/童谣"),
        ('TO',u"玩意/把式"),
        ('SP',u"地方特色"),)

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

    def query_posts(self,):
        return Post.objects(author = self)

    def query_user(self,):
        return self.user

# TODO: think the relationship between Uploaders, Posts and Comments.
class Comment(EmbeddedDocument):
    content = StringField()
    owner = ReferenceField(User,required=True,dbref=False)
    creadted_at = DateTimeField(default=datetime.datetime.utcnow())

class Post(Document):
    title = StringField(max_length=200,required=True)
    catalogue = StringField(max_length=10,choices=CATALOGUE)
    # content_type = ListField()
    #     # StringField(max_length=10,)
    author = ReferenceField(Uploader,required=True,dbref=False)
    comment = EmbeddedDocumentListField(document_type=Comment)
    creadted_at = DateTimeField(default=datetime.datetime.utcnow())
    text = StringField()
    img_url = ListField(URLField(required=False))
    video_url = ListField(URLField(required=False))
    audio_url = ListField(URLField(required=False))

    meta = {'allow_inheritance': True}

    def add_comment(self,comment):
        self.comment.append(comment)
        self.save()

    def query_author(self,):
        return self.author
        # return Uploader.objects(id = self.author.id).first()
    def query_user(self,):
        return self.author.user

# class TextPost(Post):
#     content = StringField()
#
# class ImagePost(Post):
#     link_url = URLField()
#
# class VideoPost(Post):
#     link_url = URLField()

