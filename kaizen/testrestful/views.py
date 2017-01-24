# Create your views here.
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


import oss2

from .serializers import EmployeeSerilizer,UploadFileSerilizer,UploadImageSerilizer
from testconnect.models import Employee
from .models import UploadFile

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
        return Response({''},status=HTTP_200_OK)


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
            return Response({str(file_obj.name)},status=HTTP_200_OK)
        else:
            errors = serializer.errors
            custom_key =  api_settings.NON_FIELD_ERRORS_KEY
            return Response(errors,status=HTTP_400_BAD_REQUEST)











