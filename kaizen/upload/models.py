# -*- coding: utf-8 -*-

import datetime
from mongoengine import *
from accounts.models import User
from bson.objectid import ObjectId


# Create your models here.

SEX = (('M', '男'),
        ('F', '女'),)

CATALOGUE = (('GA',u"民间游戏"),
        ('ST',u"传说/故事"),
        ('SO',u"儿歌/童谣"),
        ('TO',u"玩意/把式"),
        ('SP',u"地方特色"),
        ('OT',u"其他"),)

CATALOGUE_PRIME_DETAIL = {
    u'民间游戏':[u'棋牌',u'空间/图形',u'对猜/竞猜',u'个人对抗',u'团体对抗',u'其他'],
    u'传说/故事':[u'地方传说',u'地名来历',u'床头故事',u'人生阅历',u'其他',],
    u'儿歌/童谣':[u'童谣',u'谚语',u'顺口溜',u'儿歌',u'摇篮曲',u'其他'],
    u'玩意/把式':[u'物件',u'工艺',u'其他',],
    u'地方特色':[u'音乐',u'美术',u'舞蹈',u'饮食',u'建筑景观',u'习俗/传统',u'其他',],
    u'其他':[u'其他']
}


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

class Catalogue(Document):
    catalogue_primary = StringField(max_length=10,choices=CATALOGUE)
    catalogue_detail = StringField(max_length=10, choices=CATALOGUE)

    meta = {'allow_inheritance': True}


# TODO: think the relationship between Uploaders, Posts and Comments.
class Comment(EmbeddedDocument):
    id = ObjectIdField(required=True, default=ObjectId, unique=True, primary_key=True)
    content = StringField()
    owner = ReferenceField(User,required=True,dbref=False)
    created_at = DateTimeField(default=datetime.datetime.utcnow())

class Post(Document):
    title = StringField(max_length=200,required=True)
    catalogue = StringField(max_length=20,regex="[^\.\ \t\n\r]+\.[^\.\ \t\n\r]+")
    # content_type = ListField()
    #     # StringField(max_length=10,)
    author = ReferenceField(Uploader,required=True,dbref=False)
    comment = EmbeddedDocumentListField(document_type=Comment)
    creadted_at = DateTimeField(default=datetime.datetime.utcnow())
    text = StringField()
    img_url = ListField(URLField(required=False,null=True))
    video_url = ListField(URLField(required=False,null=True))
    audio_url = ListField(URLField(required=False,null=True))

    meta = {'indexes': [
        'title',
        'text',
        {'fields': ['$title','$text'],
         'weights': {'title': 7, 'text': 3}
        }
    ]}

    def add_comment(self,comment):
        # self.update(push__comment=comment)
        self.comment.append(comment)
        self.save()

    def query_author(self,):
        return self.author
        # return Uploader.objects(id = self.author.id).first()
    def query_user(self,):
        return self.author.user

    def query_commentByUser(self,user):
        return [x for x in self.comment if x.user == user]

    def query_commentById(self,id):
        objId = ObjectId(id)
        for x in self.comment:
            if x.id == objId:
                return x
        else:
            return None


# class TextPost(Post):
#     content = StringField()
#
# class ImagePost(Post):
#     link_url = URLField()
#
# class VideoPost(Post):
#     link_url = URLField()

