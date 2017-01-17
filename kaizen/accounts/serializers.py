import jwt
import uuid
import warnings
from datetime import datetime
from calendar import timegm

from django.contrib.auth.hashers import make_password
from django.utils.translation import ugettext_lazy as _

from rest_framework_mongoengine import serializers
from rest_framework.exceptions import ValidationError
from rest_framework_jwt.settings import api_settings
from .models import User
from .utils import my_jwt_payload_handler

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class UserLoginSerializer(serializers.DocumentSerializer):
    token = serializers.serializers.CharField(allow_blank=True, read_only=True)
    username = serializers.serializers.CharField(required=True)
    password = serializers.serializers.CharField(required=False, write_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'token',
        ]
        extra_kwargs = {"password":
                            {"write_only": True}
                        }

    # msg.format(**kwargs)
    # _("TIncorrect password").format()
    def validate(self, data):
        username = data.get("username", None)
        # password = make_password(data.get("password", None)) # hash password
        password = data.get("password", None)
        if not username:
            raise ValidationError("username is required to login")
        if User.objects(username=username).first() == None:
            raise ValidationError("This user does not exist")
        user = User.objects.get(username=username)
        if not user.password == password: #not hash password
            raise ValidationError("Incorrect password")
        # print(str(user))
        payload = jwt_payload_handler(user)
        # to allow token refresh
        if api_settings.JWT_ALLOW_REFRESH:
            payload['orig_iat'] = timegm(
                datetime.utcnow().utctimetuple()
            )

        token = jwt_encode_handler(payload)

        data["token"] = str(token)
        return data

class UserRegisterSerializer(serializers.DocumentSerializer):
    password = serializers.serializers.CharField(write_only=True)
    # username = serializers.serializers.CharField(required=True)
    # email = serializers.serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'email',
        ]

    def create(self,validated_data):
        user = User(
            username = validated_data['username'],
            email = validated_data['email'],
        )
        # user.password = make_password(validated_data['password']) #hash password
        user.password = validated_data['password']
        user.save()
        return user



