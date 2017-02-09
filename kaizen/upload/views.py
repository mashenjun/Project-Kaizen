import re
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import views,status

from rest_framework.parsers import FileUploadParser,MultiPartParser
from rest_framework.settings import api_settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly
)

from rest_framework_mongoengine import generics

from .serializers import UploaderCreateSerilizer
from .models import Uploader
from rest_framework.renderers import JSONRenderer

# Create your views here.
def debugfuntion():
    print('[DEBUG-data-fromdb]{0}'.format(Uploader.objects()[1].location))


class CreateUploaderView(generics.ListCreateAPIView):
    serializer_class = UploaderCreateSerilizer
    parser_classes = (MultiPartParser,)
    permission_classes = [AllowAny]

    queryset = Uploader.objects()

    def fillinlocation(self, queryset,datalist):
        for data in datalist:
            data['location'] = queryset['location']
        return data


    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = UploaderCreateSerilizer(page, many=True)
            print('[DEBUGE-1]{0}'.format(type(queryset[0])))
            print('[DEBUGE-2]{0}'.format(type(serializer.data[0].get('location'))))
            # self.fillinlocation(queryset,serializer.data)
            return self.get_paginated_response(serializer.data)

        serializer = UploaderCreateSerilizer(queryset, many=True)
        # self.fillinlocation(queryset, serializer.data)
        return Response(serializer.data)

    def post(self, request, format = None,):
        # serializer = UploadImageSerilizer(data=request.data)
        # location = [float(x) for x in request.data.get('location').split(',')]
        data = request.data.copy()
        date_regex = re.compile('^\d{4}-\d{2}-\d{2}$')
        location_regex = re.compile('^-?\d+,-?\d+$')
        if location_regex.match(data.get('location')) is not None:
            data['location'] = [float(x) for x in request.data.get('location').split(',')]
        if date_regex.match(data.get('birth_day')) is not None:
            data['birth_day'] = data['birth_day']+'T00:00:00';
        # serializer.location = location
        # print('[DEBUGE]{0}'.format(type(data['photo'])))
        serializer = UploaderCreateSerilizer(data=data)
        if serializer.is_valid(raise_exception=False):
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
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
        # print("[DEBUG]{0}".format(content_type))
        resized_img = photo  # Handle resizing here
        return HttpResponse(resized_img, content_type=content_type)
    except :
        return Response(status=status.HTTP_404_NOT_FOUND)


