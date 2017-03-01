import re, traceback, sys
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
from .customize.custompermission import WhitelistPermission
from rest_framework_mongoengine import generics
from rest_framework_mongoengine.generics import get_object_or_404

from .serializers import (
    UploaderCreateSerializer,
    PostCreateSerializer,
    PostListSerializer,
    CommentCreateSerializer,
    PostUpdateSerializer,
)
from .models import Uploader,Post
from .customize.utils import get_token
from .customize.utils import getlogger
from rest_framework.renderers import JSONRenderer

# Create your views here.

logger = getlogger(__name__)


class CreateUploaderView(generics.ListCreateAPIView):
    serializer_class = UploaderCreateSerializer
    parser_classes = (MultiPartParser,)
    permission_classes = [AllowAny]
    # TODO:later change to IsAuthenticatedOrReadOnly
    queryset = Uploader.objects()

    def fillinlocation(self, datalist_db,datalist_output):
        """
        this function change the location field in serializer.data according to queryset result
        because the format in the db doesn't match the view's format.
        @ShenjunMa

        :param datalist_db:
        :param datalist_output:
        :return: a new serializer.data

        """
        for x in range(0, len(datalist_db)):
            datalist_output[x]['location'] = datalist_db[x]['location']
        return datalist_output

    def list(self, request, *args, **kwargs):
        # the location field issue need to be fixed by overwrite the list method.
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = UploaderCreateSerializer(page, many=True)
            restult = self.fillinlocation(queryset,serializer.data)
            return self.get_paginated_response(restult)

        serializer = UploaderCreateSerializer(queryset, many=True)
        restult = self.fillinlocation(queryset, serializer.data)
        return Response(restult)

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
        serializer = UploaderCreateSerializer(data=data)
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

class RetrieveUploaderView(generics.RetrieveAPIView):
    serializer_class = UploaderCreateSerializer
    permission_classes = [AllowAny]
    queryset = Uploader.objects()
    lookup_field = 'name'

class CreatePostView(generics.ListCreateAPIView):
    serializer_class = PostCreateSerializer
    parser_classes = (MultiPartParser,)
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
    serializer_class = PostListSerializer
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
        """
        Get the list of items for this view.
        This must be an iterable, and may be a queryset.
        Defaults to using `self.queryset`.

        This method should always be used rather than accessing `self.queryset`
        directly, as `self.queryset` gets evaluated only once, and those results
        are cached for all subsequent requests.

        You may want to override this if you need to provide different
        querysets depending on the incoming request.

        (Eg. return a list of items that is specific to the user)
        """
        result = Post.objects()
        assert self.queryset is not None, (
            "'%s' should either include a `queryset` attribute, "
            "or override the `get_queryset()` method."
            % self.__class__.__name__
        )
        id = self.request.data.get('id',None)
        logger.debug(self.request.query_params)
        if id is not None:
            result = Post.objects(id = id)

        return result


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
        logger.debug(comment_data)
        post = Post.objects.get(id=id) # get model instance
        logger.debug(post.title)
        serializer = PostUpdateSerializer(post,data=comment_data)
        logger.debug(serializer.is_valid())
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
def uploader_photo_view(request, name,):
    try:
        uploader = Uploader.objects.get(name=name)
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


if __name__ == '__main__':
    @api_view(['POST'])
    @permission_classes([AllowAny])
    # @permission_classes([WhitelistPermission])
    def OSS_callback_handler(request):
        # TODO:store data in to db.
        # content is {"mimeType":"image/png","height":"256","size":"3251","url":"","filename":"user-dir/files.png","width":"256"}

        return Response(request.data,status=status.HTTP_200_OK)


# TODO:insert comment into post.
