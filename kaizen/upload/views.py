from django.shortcuts import render
from rest_framework import generics,views,status
from rest_framework.parsers import FileUploadParser,MultiPartParser
from rest_framework.response import Response
from rest_framework.settings import api_settings

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly
)

from .serializers import UploaderCreateSerilizer
from .models import Uploader


# Create your views here.

class CreateUploaderView(generics.ListCreateAPIView):
    serializer_class = UploaderCreateSerilizer
    parser_classes = (MultiPartParser,)
    permission_classes = [AllowAny]

    queryset = Uploader.objects

    def post(self, request, format = None,):

        # serializer = UploadImageSerilizer(data=request.data)
        # location = [float(x) for x in request.data.get('location').split(',')]
        data = request.data.copy()


        print("[DEBUG]{0}".format(type(data['location'])))

        if isinstance(data.get('location'), list)==False:
            data['location'] = [float(x) for x in request.data.get('location').split(',')]
            # print("[DEBUG]{0}".format())
        # serializer.location = location
        print("[DEBUG]{0}".format(type(data['location'])))
        serializer = UploaderCreateSerilizer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

