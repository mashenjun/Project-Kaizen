import jwt
import uuid
import warnings
from datetime import datetime
from calendar import timegm

from rest_framework_mongoengine import serializers
from rest_framework.exceptions import ValidationError
from rest_framework_jwt.settings import api_settings
from .models import User
from .utils import my_jwt_payload_handler

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class UserLoginSerilizer(serializers.DocumentSerializer):
    token = serializers.serializers.CharField(allow_blank=True, read_only=True)
    username = serializers.serializers.CharField(required=True)
    password = serializers.serializers.CharField(required=True)
    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'token',
        ]
        extra_kwargs = {"password":
                            {"write_only":True}
                        }
    def validate(self, data):
        username = data.get("username",None)
        password = data.get("password",None)
        if not username:
            raise ValidationError("username is required to login")
        if User.objects(username = username).first() == None:
            raise ValidationError("This user does not exist")
        user = User.objects.get(username = username)
        if not user.password == password:
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




