# Create your views here.
import oss2
import time
import datetime
import json
import base64
import hmac
import logging
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

from kaizen.config import (
    accessKeyId,
    accessKeySecret,
    host,
    expire_time,
    upload_dir,
    callback_url,
)

import oss2
from .serializers import EmployeeSerilizer,UploadFileSerilizer,UploadImageSerilizer
from testconnect.models import Employee

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

def get_iso_8601(expire):
    print(expire)
    gmt = datetime.datetime.fromtimestamp(expire).isoformat()
    gmt += 'Z'
    return gmt

def get_token():
    now = int(time.time())
    expire_syncpoint  = now + expire_time
    expire = get_iso_8601(expire_syncpoint)

    policy_dict = {}
    policy_dict['expiration'] = expire
    condition_array = []
    array_item = []
    array_item.append('starts-with');
    array_item.append('$key');
    array_item.append(upload_dir);
    condition_array.append(array_item)
    policy_dict['conditions'] = condition_array
    policy = json.dumps(policy_dict).strip()
    policy_encode = base64.b64encode(policy.encode('ascii'))
    h = hmac.new(bytes(accessKeySecret, 'utf-8'), policy_encode, sha)
    sign_result = base64.encodebytes(h.digest()).strip()

    callback_dict = {}
    callback_dict['callbackUrl'] = callback_url;
    callback_dict['callbackBody'] = 'filename=${object}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}';
    callback_dict['callbackBodyType'] = 'application/x-www-form-urlencoded';
    callback_param = json.dumps(callback_dict).strip()
    base64_callback_body = base64.b64encode(callback_param.encode('ascii'));

    token_dict = {}
    token_dict['accessid'] = accessKeyId
    token_dict['host'] = host
    token_dict['policy'] = policy_encode.decode('utf-8')
    token_dict['signature'] = sign_result.decode('utf-8')
    token_dict['expire'] = expire_syncpoint
    token_dict['dir'] = upload_dir
    token_dict['callback'] = base64_callback_body.decode('utf-8')
    # web.header("Access-Control-Allow-Methods","POST")
    # web.header("Access-Control-Allow-Origin","*")
    #web.header('Content-Type', 'text/html; charset=UTF-8')
    logger.debug(token_dict)
    result = json.dumps(token_dict)
    return Response(result, status=status.HTTP_200_OK)


    return result

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
    return Response({"message": "Hello, world!"+str(name)})

def my_view(request):
    # View code here...
    return render_to_response('index.html')


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def OSS(request):
    token = get_token()
    print(token)
    return token