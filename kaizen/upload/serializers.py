
from rest_framework_mongoengine import serializers,fields
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from testconnect.models import Employee
# from rest_framework import serializers
from .models import Uploader,SEX
from accounts.models import User

class UploaderCreateSerilizer(serializers.DocumentSerializer):
    name = serializers.serializers.CharField()
    birth_day = serializers.serializers.DateField()
    sex = serializers.serializers.ChoiceField(choices=SEX)

    photo = fields.ImageField()
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

    def create(self,validated_data):
        print("[DEDUG] Called")
        print("[DEDUG]%s" % str(validated_data))
        # how to retrive user form validated_date

        uploader = Uploader(

        )

        # uploader.save()
        return uploader
