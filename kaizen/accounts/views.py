from django.shortcuts import render

from rest_framework_jwt.settings import api_settings

from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK,HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
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

jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER

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
            return Response(response_data_success, status=HTTP_200_OK)
        else:
            response_data_fail = {
                'username': data.get('username'),
                'loginsuccess': False,
                'errormessage': serializer.errors
            }
            return Response(response_data_fail,status=HTTP_400_BAD_REQUEST)


class UserRegisterAPIView(ListCreateAPIView):
    queryset = User.objects
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer




