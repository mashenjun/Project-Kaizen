from django.shortcuts import render
from rest_framework import generics,views
from rest_framework.parsers import FileUploadParser,MultiPartParser
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.status import HTTP_200_OK,HTTP_400_BAD_REQUEST,HTTP_204_NO_CONTENT
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

