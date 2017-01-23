
from rest_framework_mongoengine import serializers
from testconnect.models import Employee
# from rest_framework import serializers
from .models import UploadFile
from accounts.models import User
"""
Serializing all the Authors
"""
class EmployeeSerilizer(serializers.DocumentSerializer):
    email = serializers.serializers.CharField(allow_blank=True, read_only=True)
    first_name = serializers.serializers.CharField(allow_blank=True, read_only=True)
    last_name = serializers.serializers.CharField(allow_blank=True, read_only=True)
    class Meta:
        model = Employee
        fields = [
            'email',
            'first_name',
            'last_name',
        ]

class UploadFileSerilizer(serializers.DocumentSerializer):
    file = serializers.serializers.FileField(max_length=None,use_url=True)
    # file = serializers.serializers.CharField(allow_blank=True, read_only=True)
    class Meta:
        model = UploadFile
        fields = [
            'file',
        ]