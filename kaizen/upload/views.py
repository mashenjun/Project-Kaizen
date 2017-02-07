from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics,views,status
from rest_framework.parsers import FileUploadParser,MultiPartParser
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.decorators import api_view, permission_classes
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

        if isinstance(data.get('location'), list)==False:
            data['location'] = [float(x) for x in request.data.get('location').split(',')]
            # print("[DEBUG]{0}".format())
        # serializer.location = location

        serializer = UploaderCreateSerilizer(data=data)
        if serializer.is_valid(raise_exception=False):
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            print("[DEBUG]{0}".format(serializer.data))
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            errors = serializer.errors

            response_data_fail = {
                'errormessage': errors
            }
            return Response(response_data_fail,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def uploader_photo_view(request,  name,):
    try:
        uploader = Uploader.objects.get(name=name)
        photo = uploader.photo.read()
        content_type = uploader.photo.format
        print("[DEBUG]{0}".format(content_type))
        resized_img = photo  # Handle resizing here
        return HttpResponse(resized_img, content_type=content_type)
    except :
        return Response(status=status.HTTP_404_NOT_FOUND)


