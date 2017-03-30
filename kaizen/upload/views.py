import re, traceback, sys, os

from pymongo import MongoClient
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import views,status,mixins

from rest_framework.parsers import FileUploadParser,MultiPartParser
from rest_framework.settings import api_settings
from rest_framework.reverse import reverse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly
)
from .customize.custompermission import WhitelistPermission
from .customize.custompagination import StandardResultsSetPagination
from rest_framework_mongoengine import generics
from rest_framework_mongoengine.generics import get_object_or_404

from .serializers import (
    UploaderCreateSerializer,
    UploaderListSerializer,
    PostCreateSerializer,
    PostListSerializer,
    CommentCreateSerializer,
    PostUpdateCommentSerializer,
    PostBelongUploaderSerializer,
    UploaderEditSerializer,
    UploaderDetailSerializer,
    UploaderBelongUserSerializer,
    UploaderSimplelSerializer,
    PostEditSerializer,
    PostDetailSerializer,
)
from kaizen.settings import (
    _MONGODB_DATABASE_HOST,
    _MONGODB_HOST,
    _MONGODB_NAME,
    _MONGODB_PASSWD,
    _MONGODB_USER,
    _MONGODB_PORT,
)
from .models import Uploader,Post,Comment
from .customize.utils import get_token
from .customize.utils import getlogger
from .customize.utils import modifyUploaderResponseData, modifyUploaderRequestData
from rest_framework.renderers import JSONRenderer

# Create your views here.

logger = getlogger(__name__)


class CreateListUploaderView(generics.ListCreateAPIView):
    serializer_class = UploaderCreateSerializer
    parser_classes = (MultiPartParser,)
    permission_classes = [AllowAny]
    # TODO:later change to IsAuthenticatedOrReadOnly
    queryset = Uploader.objects()
    # def modifyResponseData(self, datalist_db, datalist_output):
    #     """
    #     this function change the location field in serializer.data according to queryset result
    #     because the format in the db doesn't match the view's format.
    #     @ShenjunMa
    #
    #     :param datalist_db:
    #     :param datalist_output:
    #     :return: a new serializer.data
    #
    #     """
    #     for x in range(0, len(datalist_db)):
    #         datalist_output[x]['location'] = datalist_db[x]['location']
    #         # TODO: change to real host address
    #         datalist_output[x]['photo_url'] = reverse('get-photo', args=[datalist_output[x]['id']])
    #     return datalist_output
    def list(self, request, *args, **kwargs):
        # the location field issue need to be fixed by overwrite the list method.
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None and 'page' in request.query_params:
            serializer = UploaderListSerializer(page, context={'request':request},many=True)
            restult = modifyUploaderResponseData(page, serializer.data)
            return self.get_paginated_response(restult)

        elif 'page' not in request.query_params:
            serializer = UploaderListSerializer(queryset,context={'request':request}, many=True)
            result = modifyUploaderResponseData(queryset, serializer.data)
            data = {'count':len(result),
                    'results': result,
                    }
            return Response(data,status=status.HTTP_200_OK)

        serializer = UploaderListSerializer(queryset, context={'request':request} ,many=True)
        restult = modifyUploaderResponseData(queryset, serializer.data)
        return Response(restult,status=status.HTTP_200_OK)

    def post(self, request, format = None,):
        logger.debug(request.data)
        # serializer = UploadImageSerilizer(data=request.data)
        # location = [float(x) for x in request.data.get('location').split(',')]
        # data = request.data.copy()
        # date_regex = re.compile('^\d{4}-\d{2}-\d{2}$')
        # location_regex = re.compile('^-?\d+,-?\d+$')
        # if location_regex.match(data.get('location')) is not None:
        #     data['location'] = [float(x) for x in request.data.get('location').split(',')]
        # if date_regex.match(data.get('birth_day')) is not None:
        #     data['birth_day'] = data['birth_day']+'T00:00:00';
        newrequest = modifyUploaderRequestData(request)
        # serializer.location = location
        # print('[DEBUGE]{0}'.format(type(data['photo'])))
        serializer = self.get_serializer(data=newrequest.data)
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

class FilterUploaderbyUserView(generics.ListAPIView):
    serializer_class = UploaderBelongUserSerializer
    permission_classes = [AllowAny]
    pagination_class = None

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        user = self.kwargs['userid']
        print("[DEBUG]{0}".format(user))
        return Uploader.objects.filter(user=user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            restult = modifyUploaderResponseData(page, serializer.data)
            return self.get_paginated_response(restult)

        serializer = self.get_serializer(queryset, many=True)
        result = modifyUploaderResponseData(queryset, serializer.data)
        return Response(result)

class RetrieveUploaderView(generics.RetrieveAPIView):
    serializer_class = UploaderSimplelSerializer
    permission_classes = [AllowAny]
    queryset = Uploader.objects()
    # lookup_field = 'name'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        result = modifyUploaderResponseData(instance, serializer.data)
        # if 'location' in result:
        #     result['location'] = instance['location']
        # if 'id' in instance:
        #     result['photo_url'] = reverse('get-photo', args=[instance['id']])
        return Response(result)

class EditUploaderView(mixins.DestroyModelMixin,mixins.UpdateModelMixin, generics.RetrieveAPIView):
    serializer_class = UploaderEditSerializer
    # TODO: change permission_class
    # parser_classes = (MultiPartParser,)
    permission_classes = [AllowAny]
    queryset = Uploader.objects()
    # lookup_field = 'name'

    def update(self, request, *args, **kwargs):
        # modify the photo_url and location format
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # refresh the instance from the database.
            instance = self.get_object()
            serializer = self.get_serializer(instance)

        result = modifyUploaderResponseData(instance, serializer.data)
        return Response(result)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        result = modifyUploaderResponseData(instance, serializer.data)
        return Response(result)

    def put(self, request, *args, **kwargs):
        logger.debug(request.data)
        newrequest = modifyUploaderRequestData(request)
        return self.partial_update(newrequest, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class CreateListPostView(generics.ListCreateAPIView):
    serializer_class = PostCreateSerializer
    # parser_classes = (MultiPartParser,)
    permission_classes = [AllowAny]
    # TODO:later change to IsAuthenticatedOrReadOnly
    queryset = Post.objects()

    def get_serializer_class(self):
        """
        Return the class to use for the serializer.
        Defaults to using `self.serializer_class`.

        You may want to override this if you need to provide different
        serializations depending on the incoming request.

        (Eg. admins get full serialization, others get basic serialization)
        """
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )

        if self.request.method == 'GET':
            return PostListSerializer
        else:
            return self.serializer_class


class RetrievePostView(generics.RetrieveAPIView):
    serializer_class = PostDetailSerializer
    permission_classes = [AllowAny]
    queryset = Post.objects() # not necessary set the generate queryset here


    def get_object(self):
        ""
        queryset = self.filter_queryset(self.get_queryset())

        # Perform the lookup filtering.
        # lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        # assert lookup_url_kwarg in self.kwargs, (
        #     'Expected view %s to be called with a URL keyword argument '
        #     'named "%s". Fix your URL conf, or set the `.lookup_field` '
        #     'attribute on the view correctly.' %
        #     (self.__class__.__name__, lookup_url_kwarg)
        # )

        # filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}

        obj = get_object_or_404(queryset)

        self.check_object_permissions(self.request, obj)

        return obj

    def get_queryset(self):
        result = Post.objects()
        assert self.queryset is not None, (
            "'%s' should either include a `queryset` attribute, "
            "or override the `get_queryset()` method."
            % self.__class__.__name__
        )
        id = self.kwargs['id']
        if id is not None:
            result = Post.objects(id = id)

        return result

class EditPostView(mixins.DestroyModelMixin,mixins.UpdateModelMixin, generics.RetrieveAPIView):
    serializer_class = PostEditSerializer
    # TODO: change permission_class
    # parser_classes = (MultiPartParser,)
    permission_classes = [AllowAny]
    queryset = Post.objects()
    # lookup_field = 'name'

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        logger.debug(instance)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


    def put(self, request, *args, **kwargs):
        logger.debug(request.data)
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class ListPostView(generics.ListAPIView):
    serializer_class = PostListSerializer
    permission_classes = [AllowAny]
    # TODO:later change to IsAuthenticatedOrReadOnly
    queryset = Post.objects()

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Post.objects()
        author = self.request.data.get('author', None)
        if author is not None:
            queryset = queryset.filter(author=author)
        return queryset

class FilterPostbyUploaderView(generics.ListAPIView):
    serializer_class = PostBelongUploaderSerializer
    permission_classes = [AllowAny]
    pagination_class = None

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        author = self.kwargs['authorid']
        return Post.objects.filter(author=author)

    # def list(self, request, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset())
    #
    #     page = self.paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         restult = modifyUploaderResponseData(page, serializer.data)
    #         return self.get_paginated_response(restult)
    #
    #     serializer = self.get_serializer(queryset, many=True)
    #     restult = modifyUploaderResponseData(queryset, serializer.data)
    #     return Response(restult)


# function based view
@api_view(['PUT'])
@permission_classes([AllowAny])
def insert_comment_post(request):
    try:
        id = request.data.get('post',None)
        data = request.data.copy()
        content = request.data.get('content',None)
        owner = request.data.get('owner',None)
        del data['post']
        comment_data = {'comment':[{'content':content,'owner':owner}]}
        post = Post.objects.get(id=id) # get model instance
        serializer = PostUpdateCommentSerializer(post, data=comment_data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return  Response(status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print("Exception in user code:")
        print("-"*60)
        traceback.print_exc(file=sys.stdout)
        print("-"*60)
        return Response(status=status.HTTP_417_EXPECTATION_FAILED)

@api_view(['GET'])
@permission_classes([AllowAny])
def uploader_photo_view(request, id,):
    try:
        uploader = Uploader.objects.get(id=id)
        photo = uploader.photo.read()
        content_type = uploader.photo.format
        # print("[DEBUG]{0}".format(content_type))
        resized_img = photo  # Handle resizing here
        return HttpResponse(resized_img, content_type=content_type)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([AllowAny])
# @permission_classes([IsAuthenticated])
def OSS_signature():
    token = get_token()
    print(token)
    return token

@api_view(['GET'])
@permission_classes([AllowAny])
def query_province(request):
    client = MongoClient(_MONGODB_HOST, _MONGODB_PORT)
    try:
        province = client[_MONGODB_NAME].city
        result = []
        for item in province.find():
            info = {
                "name": item.get("name"),
                "prefix": item.get("prefix"),
                "code": item.get("code")
            }
            result.append(info)
        return Response(result, status=status.HTTP_200_OK)
    except :
        error_msg = {
            "error_message": "Something wrong with your request."
        }
        return Response(error_msg, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def query_city(request,province_code=None):
    client = MongoClient(_MONGODB_HOST, _MONGODB_PORT)
    try:
        province = client[_MONGODB_NAME].city.find({"code": province_code})[0]
        result = []

        for item in province['cities']:
            if (item.get("prefix")=="市"):
                info = {
                    "name": item.get("name"),
                    "prefix": item.get("prefix"),
                    "code": item.get("code"),
                    # "cities": [{"name":city["name"],"prefix": city["prefix"]} for city in item.get("cities")]

                }
            elif (item.get("prefix")=="区"):
                info = {
                    "name": item.get("name"),
                    "prefix": item.get("prefix"),
                    # "code": item.get("code"),
                    # "cities": [{"name":city["name"],"prefix": city["prefix"]} for city in item.get("cities")]
                }
            result.append(info)
        return Response(result, status=status.HTTP_200_OK)
    except :
        error_msg = {
            "error_message": "Something wrong with your request."
        }
        return Response(error_msg, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([AllowAny])
def query_district(request,province_code=None,city_code=None):
    client = MongoClient(_MONGODB_HOST, _MONGODB_PORT)
    try:
        result = []
        city = client[_MONGODB_NAME].city.find({"code": province_code})[0]['cities']
        for item in city:
            if (item["code"]==city_code):
                for area in item['cities']:
                    info = {
                        "name": area.get("name"),
                        "prefix": area.get("prefix"),
                    }
                    result.append(info)
                break
        return Response(result, status=status.HTTP_200_OK)
    except:
        error_msg = {
            "error_message": "Something wrong with your request."
        }
    return Response(error_msg, status=status.HTTP_400_BAD_REQUEST)

if __name__ == '__main__':
    @api_view(['POST'])
    @permission_classes([AllowAny])
    # @permission_classes([WhitelistPermission])
    def OSS_callback_handler(request):
        # TODO:store data in to db.
        # content is {"mimeType":"image/png","height":"256","size":"3251","url":"","filename":"user-dir/files.png","width":"256"}

        return Response(request.data,status=status.HTTP_200_OK)


# TODO:insert comment into post.
