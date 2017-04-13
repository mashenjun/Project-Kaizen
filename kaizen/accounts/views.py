from django.shortcuts import render
from django.core.urlresolvers import reverse

from rest_framework_jwt.settings import api_settings as jwt_api_setting

from rest_framework.response import Response
from rest_framework import status,mixins
from rest_framework.views import APIView
from rest_framework.settings import api_settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.filters import (
    SearchFilter,
    OrderingFilter,
)
from rest_framework.mixins import (
    DestroyModelMixin,
    UpdateModelMixin,
)
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly
)
from rest_framework_mongoengine import generics

from captcha.models import CaptchaStore
from captcha.conf import settings

from rest_framework_jwt.views import JSONWebTokenAPIView

from .serializers import (
    UserLoginSerializer,
    UserRegisterSerializer,
    RequiredSerializer,
    NotRequiredSerializer,
    UserDetailSerializer,
    UserEditSerializer,
    UserSimpleSerializer,
    CustomRefreshJSONWebTokenSerializer
)
from .models import User
from upload.customize.utils import modifyUploaderResponseData

jwt_response_payload_handler = jwt_api_setting.JWT_RESPONSE_PAYLOAD_HANDLER

# Create your views here.
# def login_view(request):
#     form = UserLoginForm(request.POST or None)
#     if form.is_valid():
#         username = form.cleaned_data.get("username")
#         password = form.cleaned_data.get("password")
#     return render(request,"accounts/test_login.html",{"form":form})
#
# def register_view(request):
#     return render(request,"form.html",{})
#
# def logout_view(request):
#     return render(request,"form.html",{})


class UserLoginAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request):
        data = request.data #request.POST

        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=False):
            username = serializer.data.get('username') or data.username
            token = serializer.data.get('token')
            id = serializer.data.get('id')
            response_data_success = {
                                'id': id,
                                'username':username,
                                'loginsuccess': True,
                                'token': token,
                            }
            return Response(response_data_success, status=status.HTTP_200_OK)
        else:
            errors = serializer.errors
            custom_key =  api_settings.NON_FIELD_ERRORS_KEY
            if custom_key in errors:
                if errors[custom_key] == ["This user does not exist"]:
                    errors['username'] = errors.pop('non_field_errors')
                elif errors[custom_key] == ["Incorrect password"]:
                    errors['password'] = errors.pop('non_field_errors')

            response_data_fail = {
                'username': data.get('username'),
                'loginsuccess': False,
                'errormessage': errors
            }
            return Response(response_data_fail,status=status.HTTP_400_BAD_REQUEST)


class UserRegisterAPIView(generics.ListCreateAPIView):
    queryset = User.objects
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer

    def post(self,request, format = None):
        data = request.data
        # serializer = UploadImageSerilizer(data=request.data)
        # location = [float(x) for x in request.data.get('location').split(',')]
        print("[DEBUG]{0}".format(str(request.data)))
        serializer = UserRegisterSerializer(data=request.data)
        # serializer.location = location

        if serializer.is_valid(raise_exception=False):
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            errors = serializer.errors
            response_data_fail = {
                'username': data.get('username'),
                'registersuccess': False,
                'errormessage': errors
            }
            return Response(response_data_fail,status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(generics.RetrieveAPIView):
    # TODO: include posts list
    serializer_class = UserDetailSerializer
    permission_classes = [AllowAny]
    queryset = User.objects()
    # lookup_field = 'name'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        result = serializer.data.copy()
        result['uploaders'] = modifyUploaderResponseData(instance.query_uploaders(),result['uploaders'])
        return Response(result)

class UserSimpleView(generics.RetrieveAPIView):
    # TODO: include posts list
    serializer_class = UserSimpleSerializer
    permission_classes = [AllowAny]
    queryset = User.objects()
    # lookup_field = 'name'


class UserEditView(mixins.DestroyModelMixin,mixins.UpdateModelMixin, generics.RetrieveAPIView):
    serializer_class = UserEditSerializer
    # TODO: change permission_class and object level permission
    # parser_classes = (MultiPartParser,)
    permission_classes = [AllowAny]
    queryset = User.objects()
    # lookup_field = 'name'

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class CustomRefreshJSONWebToken(JSONWebTokenAPIView):
    """
    override the RefreshJSONWebToken to a custom RefreshJSONWebTokenSerializer
    """
    serializer_class = CustomRefreshJSONWebTokenSerializer



# function based api
@api_view(['GET'])
@permission_classes([AllowAny])
def captcha(request):
    key = CaptchaStore.generate_key()
    data = {
        'hashkey': key,
        'image_url': reverse('captcha-image', kwargs={'key': key}),
        'image2x_url': reverse('captcha-image-2x', kwargs={'key': key}),
        'audio_url': None
    }
    if settings.CAPTCHA_FLITE_PATH:
        data['audio_url'] = reverse('captcha-audio', kwargs={'key': key})
    return Response(data,status=status.HTTP_200_OK)

# test captcha
class TestView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        print('[DEBUG-test-view]{0}'.format(self.request.query_params))
        if 'required' in self.request.query_params:
            return RequiredSerializer
        else:
            return NotRequiredSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




