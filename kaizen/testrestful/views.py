# Create your views here.
import oss2
import os
import logging
import os
from hashlib import sha1 as sha

from django.shortcuts import render_to_response
from rest_framework import generics,views
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import FileUploadParser,MultiPartParser
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework import status

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly
)

from .serializers import EmployeeSerilizer,UploadFileSerilizer,UploadImageSerilizer
from testconnect.models import Employee
from .utils import get_token
from accounts.utils import custom_refresh_token
from kaizen.config import (
    accessKeyId,
    accessKeySecret,
    host,
    expire_time,
    upload_dir,
    callback_url,
)

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# create console handler and set level to debug
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)

# create formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# add formatter to ch
ch.setFormatter(formatter)

# add ch to logger
logger.addHandler(ch)


class EmployeeView(generics.ListAPIView):
    """
    Returns a list of all authors.
    """
    serializer_class = EmployeeSerilizer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset_list = Employee.objects
        return queryset_list


class UploadFileView(views.APIView):
    serializer_class = UploadFileSerilizer
    parser_classes = (MultiPartParser ,)
    permission_classes = [AllowAny]

    def post(self,request, format = None):
        file_obj = request.data['file']
        auth = oss2.Auth('','')
        bucket = oss2.Bucket(auth, '','')
        result = bucket.put_object(str(file_obj.name), file_obj)
        print('http status: {0}'.format(result.status))
        print('request_id: {0}'.format(result.request_id))
        print('ETag: {0}'.format(result.etag))
        print('date: {0}'.format(result.headers['date']))
        return Response({''},status=status.HTTP_200_OK)


class UploadImageView(views.APIView):
    serializer_class = UploadImageSerilizer
    parser_classes = (MultiPartParser,)
    permission_classes = [AllowAny]

    def post(self,request, format = None):
        file_obj = request.data['image']
        serializer = UploadImageSerilizer(data=request.data)
        # print('[DEBUG]{0}'.format(request.data))
        if serializer.is_valid(raise_exception=False):
            serializer.save()
            return Response({str(file_obj.name)},status=status.HTTP_200_OK)
        else:
            errors = serializer.errors
            custom_key =  api_settings.NON_FIELD_ERRORS_KEY
            return Response(errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def hello_world(request,name):
    if request.method == 'POST':
        return Response({"message": "Got some data!", "data": request.data})

    elif request.method == 'GET':
        jwtToken = name
        newToken = custom_refresh_token(jwtToken)
        return Response({"message": "Got some data!", "data": newToken})
    return Response({"message": "Hello, world!"+str(name)})



@api_view(['GET'])
@permission_classes([AllowAny])
def OSStestpage(request):
    # View code here...
    return render_to_response('index.html')


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def OSSgetsig(request):
    token = get_token()
    return token

@api_view(['POST'])
@permission_classes([AllowAny])
def checkrequest(request):
    result =request.data.copy()
    result['OSS_url'] = os.path.join(host, request.data['filename'])
    print(result)
    return Response(result,status=status.HTTP_200_OK)

