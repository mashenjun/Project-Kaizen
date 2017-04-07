
from rest_framework_mongoengine import serializers,fields
import random
from io import BytesIO
from time import gmtime, strftime
from pydenticon import Generator
import PIL
from os import SEEK_END

from rest_framework.exceptions import ErrorDetail, ValidationError
from rest_framework_mongoengine import serializers,fields


from django.core.files.uploadedfile import InMemoryUploadedFile


from .models import Uploader,SEX,Post,Comment
from .customize.utils import getlogger
from accounts.models import User
import inspect
from mongoengine.errors import ValidationError as me_ValidationError

logger = getlogger(__name__)

def get_default_image():
    # TODO: change the random generator
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
    basestr = strftime("%H-%M-%S", gmtime())+"-"+str(random.uniform(0, 59))
    raw_image = generator.generate(basestr, width, height, padding=padding)
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

def validate_photo_size(value):
    """
    Check that the blog post is about Django.
    """
    max_size = 210 * 210 * 50  # xxxMB
    if value.size > max_size:
        raise ValidationError('Profile Image too large.')
    return value



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
        owner = User.objects.get(id = validated_data['owner'].id)
        content = validated_data['content']
        newcomment = Comment(owner= owner,content=content)
        post.add_comment(newcomment)
        return newcomment
    def insert(self,post):
        post.add_comment(self)


class PostCreateSerializer(serializers.DocumentSerializer):
    # comment = fields.GenericEmbeddedDocumentField(Comment)
    img_url = serializers.serializers.ListField(child=serializers.serializers.URLField(allow_blank=True), min_length=0)
    video_url = serializers.serializers.ListField(child=serializers.serializers.URLField(allow_blank=True),
                                                  min_length=0)
    audio_url = serializers.serializers.ListField(child=serializers.serializers.URLField(allow_blank=True),
                                                  min_length=0)
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
            # 'comment',
        ]


class PostSimpletSerializer(serializers.DocumentSerializer):

    class Meta:
        model = Post
        fields = [
            'title',
            'img_url',
            'video_url',
            'audio_url',
        ]

class PostDetailSerializer(serializers.DocumentSerializer):
    comment_count = serializers.serializers.SerializerMethodField()
    edit_url = serializers.serializers.HyperlinkedIdentityField(
        view_name='post-edit',
        lookup_field='id',
    )

    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'catalogue',
            'text',
            'img_url',
            'video_url',
            'audio_url',
            'author',
            'comment',
            "comment_count",
            'edit_url',
        ]

    def get_comment_count(self, obj):
        return len(obj.comment);


class PostListSerializer(serializers.DocumentSerializer):
    comment_count = serializers.serializers.SerializerMethodField()
    edit_url = serializers.serializers.HyperlinkedIdentityField(
        view_name='post-edit',
        lookup_field='id',
    )
    detail_url = serializers.serializers.HyperlinkedIdentityField(
        view_name='post-retrieve',
        lookup_field='id',
    )

    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'catalogue',
            'text',
            'img_url',
            'video_url',
            'audio_url',
            'author',
            "comment_count",
            'edit_url',
            'detail_url',
        ]

    def get_comment_count(self, obj):
        return len(obj.comment);

class PostUpdateCommentSerializer(serializers.DocumentSerializer):
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

class PostEditSerializer(serializers.DocumentSerializer):
    img_url = serializers.serializers.ListField(child=serializers.serializers.URLField(allow_blank=True) ,min_length=0)
    video_url = serializers.serializers.ListField(child=serializers.serializers.URLField(allow_blank=True) ,min_length=0)
    audio_url = serializers.serializers.ListField(child=serializers.serializers.URLField(allow_blank=True) ,min_length=0)
    title = serializers.serializers.CharField(required=False)
    # user = serializers.serializers.CharField(source='user.username')
    class Meta:
        model = Post
        fields = [
            'title',
            'catalogue',
            'text',
            'img_url',
            'video_url',
            'audio_url',
        ]

class PostBelongUploaderSerializer(serializers.DocumentSerializer):
    comment_count = serializers.serializers.SerializerMethodField()
    edit_url = serializers.serializers.HyperlinkedIdentityField(
        view_name='post-edit',
        lookup_field='id',
    )
    detail_url = serializers.serializers.HyperlinkedIdentityField(
        view_name='post-retrieve',
        lookup_field='id',
    )
    class Meta:
        model = Post
        fields = [
            "title",
            "catalogue",
            "creadted_at",
            "comment_count",
            'edit_url',
            'detail_url',
        ]

    def get_comment_count(self, obj):
        return len(obj.comment);

class UploaderCreateSerializer(serializers.DocumentSerializer):
    name = serializers.serializers.CharField(write_only=True)
    birth_day = serializers.serializers.DateTimeField(write_only=True)
    sex = serializers.serializers.ChoiceField(choices=SEX,write_only=True)
    photo = fields.ImageField(default=get_default_image(),use_url=True,validators=[validate_photo_size,],write_only=True)
    home_town = serializers.serializers.CharField(write_only=True)
    location = fields.GeoPointField(write_only=True)
    user = fields.ReferenceField(model=User,write_only=True)

    class Meta:
        model = Uploader
        fields = [
            'id',
            'name',
            'birth_day',
            'sex',
            'photo',
            'home_town',
            'location',
            'user',
        ]



class UploaderListSerializer(serializers.DocumentSerializer):
    name = serializers.serializers.CharField()
    birth_day = serializers.serializers.DateTimeField()
    sex = serializers.serializers.ChoiceField(choices=SEX)
    home_town = serializers.serializers.CharField()
    location = fields.GeoPointField()
    user = fields.ReferenceField(model=User)
    photo_url = serializers.serializers.HyperlinkedIdentityField(
        view_name='get-photo',
        lookup_field='id',
    )
    edit_url = serializers.serializers.HyperlinkedIdentityField(
        view_name='uploader-edit',
        lookup_field='id',
    )
    detail_url = serializers.serializers.HyperlinkedIdentityField(
        view_name='uploader-retrieve',
        lookup_field='id',
    )
    class Meta:
        model = Uploader
        fields = [
            'id',
            'name',
            'birth_day',
            'sex',
            'home_town',
            'location',
            'user',
            'photo_url',
            'edit_url',
            'detail_url',
        ]

class UploaderBelongUserSerializer(serializers.DocumentSerializer):
    name = serializers.serializers.CharField()
    birth_day = serializers.serializers.DateTimeField()
    sex = serializers.serializers.ChoiceField(choices=SEX)
    home_town = serializers.serializers.CharField()
    location = fields.GeoPointField()
    post_count = serializers.serializers.SerializerMethodField()
    photo_url = serializers.serializers.HyperlinkedIdentityField(
        view_name='get-photo',
        lookup_field='id',
    )
    edit_url = serializers.serializers.HyperlinkedIdentityField(
        view_name='uploader-edit',
        lookup_field='id',
    )
    detail_url = serializers.serializers.HyperlinkedIdentityField(
        view_name='uploader-retrieve',
        lookup_field='id',
    )
    class Meta:
        model = Uploader
        fields = [
            'id',
            'name',
            'birth_day',
            'sex',
            'home_town',
            'location',
            'post_count',
            'photo_url',
            'edit_url',
            'detail_url',
        ]

    def get_post_count(self, obj):
        return obj.query_posts().count()


class UploaderDetailSerializer(serializers.DocumentSerializer):
    name = serializers.serializers.CharField()
    birth_day = serializers.serializers.DateTimeField()
    sex = serializers.serializers.ChoiceField(choices=SEX)
    home_town = serializers.serializers.CharField()
    location = fields.GeoPointField()
    user = fields.ReferenceField(model=User)
    posts = serializers.serializers.SerializerMethodField()
    post_count = serializers.serializers.SerializerMethodField()
    photo_url = serializers.serializers.HyperlinkedIdentityField(
        view_name='get-photo',
        lookup_field='id',
    )
    edit_url = serializers.serializers.HyperlinkedIdentityField(
        view_name='uploader-edit',
        lookup_field='id',
    )
    class Meta:
        model = Uploader
        fields = [
            'id',
            'name',
            'birth_day',
            'sex',
            'home_town',
            'location',
            'user',
            'posts',
            'post_count',
            'photo_url',
            'edit_url',
        ]

    def get_posts(self,obj):
        if obj.query_posts().count() ==0:
            return [];
        return PostSimpletSerializer(obj.query_posts(),many=True).data

    def get_post_count(self,obj):
        return obj.query_posts().count()

class UploaderSimplelSerializer(serializers.DocumentSerializer):
    name = serializers.serializers.CharField()
    birth_day = serializers.serializers.DateTimeField()
    sex = serializers.serializers.ChoiceField(choices=SEX)
    home_town = serializers.serializers.CharField()
    location = fields.GeoPointField()
    user = fields.ReferenceField(model=User)
    post_count = serializers.serializers.SerializerMethodField()
    posts_url = serializers.serializers.HyperlinkedIdentityField(
        view_name = 'post-filter-uploader',
        lookup_field='id',
    )
    photo_url = serializers.serializers.HyperlinkedIdentityField(
        view_name='get-photo',
        lookup_field='id',
    )
    edit_url = serializers.serializers.HyperlinkedIdentityField(
        view_name='uploader-edit',
        lookup_field='id',
    )
    class Meta:
        model = Uploader
        fields = [
            'id',
            'name',
            'birth_day',
            'sex',
            'home_town',
            'location',
            'user',
            'post_count',
            'photo_url',
            'edit_url',
            'posts_url'
        ]

    # def get_posts(self,obj):
    #     if obj.query_posts().count() ==0:
    #         return [];
    #     return PostSimpletSerializer(obj.query_posts(),many=True).data

    def get_post_count(self,obj):
        return obj.query_posts().count()


class UploaderEditSerializer(serializers.DocumentSerializer):
    name = serializers.serializers.CharField()
    birth_day = serializers.serializers.DateTimeField()
    sex = serializers.serializers.ChoiceField(choices=SEX)
    home_town = serializers.serializers.CharField()
    location = fields.GeoPointField(required=False)
    photo = fields.ImageField(use_url=True,validators=[validate_photo_size],required=False)
    detail_url = serializers.serializers.HyperlinkedIdentityField(
        view_name='uploader-retrieve',
        lookup_field='id',
    )
    # user = serializers.serializers.CharField(source='user.username')
    class Meta:
        model = Uploader
        fields = [
            'name',
            'birth_day',
            'sex',
            'photo',
            'home_town',
            'location',
            'detail_url',
            # 'user'
        ]
        depth = 2



