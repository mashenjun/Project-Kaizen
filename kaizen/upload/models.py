from mongoengine import *

from accounts.models import User


# Create your models here.

SEX = (('M', 'Male'),
        ('F', 'Female'),)

# TYPE = (('GA',"民间游戏"),
#         ('ST',"传说/故事"),
#         ('SO',"儿歌/童谣"),
#         ('TO',"玩意/把式"),
#         ('SP',"地方特色"),)

class Uploader(Document):
    user = ReferenceField(User,required=True,dbref=False)
    name = StringField()
    birth_day = DateTimeField()
    sex = StringField(max_length=1, choices=SEX)
    photo = ImageField()
    # type = StringField(max_length=2, choices=TYPE)
    home_town = StringField()
    location = PointField()