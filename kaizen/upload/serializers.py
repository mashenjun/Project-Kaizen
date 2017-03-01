
from rest_framework_mongoengine import serializers,fields
from io import BytesIO
from time import gmtime, strftime
from pydenticon import Generator
import PIL
from os import SEEK_END
from .models import Uploader,SEX,Post,Comment
from .customize.utils import getlogger
from accounts.models import User
from django.core.files.uploadedfile import InMemoryUploadedFile
import inspect
from mongoengine.errors import ValidationError as me_ValidationError

logger = getlogger(__name__)

def get_default_image():

    width = 200
    height = 200
    padding = [20, 20, 20, 20]
    foreground = ["rgb(45,79,255)",
                  "rgb(254,180,44)",
                  "rgb(226,121,234)",
                  "rgb(30,179,253)",
                  "rgb(232,77,65)",
                  "rgb(49,203,115)",
                  "rgb(141,69,170)"]
    background = "rgb(224,224,224)"
    generator = Generator(5, 5, foreground=foreground, background=background)
    raw_image = generator.generate(strftime("%Y-%m-%d-%H-%M-%S", gmtime()), width, height, padding=padding)
    image_stream = BytesIO(raw_image)
    image = PIL.Image.open(image_stream)
    image_io = BytesIO()
    image.save(image_io,format='PNG')

    # Create a new Django file-like object to be used in models as ImageField using
    # InMemoryUploadedFile.  If you look at the source in Django, a
    # SimpleUploadedFile is essentially instantiated similarly to what is shown here
    image_InMemoryUploadedFile = InMemoryUploadedFile(image_io, None, 'avatar.png', 'image/png', image_io.seek(0, SEEK_END),
                                 None)  # give your file to InMemoryUploadedFile to create django imagefield object
    # print('[get_default_image]{0}'.format(image_InMemoryUploadedFile))
    return image_InMemoryUploadedFile


class UploaderCreateSerializer(serializers.DocumentSerializer):
    name = serializers.serializers.CharField()
    birth_day = serializers.serializers.DateTimeField()
    sex = serializers.serializers.ChoiceField(choices=SEX)

    photo = fields.ImageField(default=get_default_image(),use_url=True)
    home_town = serializers.serializers.CharField()
    location = fields.GeoPointField()
    user = fields.ReferenceField(model=User)

    class Meta:
        model = Uploader
        fields = [
            'name',
            'birth_day',
            'sex',
            'photo',
            'home_town',
            'location',
            'user',
        ]

class CommentCreateSerializer(serializers.EmbeddedDocumentSerializer):
    # post = fields.ReferenceField(model=Post,required=True)
    owner = fields.ReferenceField(model=User,required=True)
    content = serializers.serializers.CharField()
    class Meta:
        model = Comment
        fields = [
            'content',
            'owner',
        ]

    def create(self, post,validated_data):
        print("[DEBUG0]:{0}".format(str(validated_data['owner'].id)))
        owner = User.objects.get(id = validated_data['owner'].id)
        content = validated_data['content']
        newcomment = Comment(owner= owner,content=content)
        print("[DEBUG1]:{0}".format(newcomment.owner))
        print("[DEBUG2]:{0}".format(post.title))
        post.add_comment(newcomment)
        print("[DEBUG3]:{0}".format(post.comment))
        return newcomment

    def insert(self,post):
        post.add_comment(self)


class PostCreateSerializer(serializers.DocumentSerializer):
    comment = fields.GenericEmbeddedDocumentField(Comment)

    class Meta:
        model = Post
        fields = [
            'title',
            'catalogue',
            'text',
            'img_url',
            'video_url',
            'audio_url',
            'author',
            'comment',
        ]



class PostListSerializer(serializers.DocumentSerializer):

    class Meta:
        model = Post
        exclude = ('_cls',)


class PostUpdateSerializer(serializers.DocumentSerializer):
    comment = CommentCreateSerializer(many = True,required=False)

    class Meta:
        model = Post
        fields = [
            'comment',
        ]

    def update(self, instance, validated_data):
        print("[DEBUG]:{0}".format("called"))
        logger.debug(validated_data)
        comment = validated_data.pop('comment')
        logger.debug(comment)
        for comment_data in comment:
            instance.comment.append(Comment(**comment_data))

        logger.debug(type(instance))
        instance.save()
        return instance

