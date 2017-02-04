from django.shortcuts import render

from rest_framework_jwt.settings import api_settings as jwt_api_setting

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.settings import api_settings
from rest_framework.filters import (
    SearchFilter,
    OrderingFilter,
)
from rest_framework.mixins import (
    DestroyModelMixin,
    UpdateModelMixin,
)
from rest_framework.generics import (
    ListCreateAPIView,
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    UpdateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView
)
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly
)

from .forms import UserLoginForm
from .serializers import (
    UserLoginSerializer,
    UserRegisterSerializer,
)

from .models import User

jwt_response_payload_handler = jwt_api_setting.JWT_RESPONSE_PAYLOAD_HANDLER

# Create your views here.
def login_view(request):
    form = UserLoginForm(request.POST or None)
    if form.is_valid():
        username = form.cleaned_data.get("username")
        password = form.cleaned_data.get("password")
    return render(request,"accounts/test_login.html",{"form":form})

def register_view(request):
    return render(request,"form.html",{})

def logout_view(request):
    return render(request,"form.html",{})


class UserLoginAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request):
        data = request.data #request.POST

        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=False):
            username = serializer.data.get('username') or data.username
            token = serializer.data.get('token')
            response_data_success = {
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


class UserRegisterAPIView(ListCreateAPIView):
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






