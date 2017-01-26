
from rest_framework_mongoengine import serializers,fields
from testconnect.models import Employee
# from rest_framework import serializers
from .models import Uploader,SEX,TYPE
from accounts.models import User

class UploaderCreateSerilizer(serializers.DocumentSerializer):
    name = serializers.serializers.CharField()
    birth_day = serializers.serializers.DateTimeField()
    sex = serializers.serializers.ChoiceField(choices=SEX)
    photo = serializers.serializers.ImageField()
    type = serializers.serializers.ChoiceField(choices=TYPE)
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
            'type',
            'home_town',
            'location',
            'user',
        ]

    def create(self,validated_data):
        # how to retrive user form validated_date
        uploader = Uploader(
        )

        # uploader.save()
        return uploader
