from django.shortcuts import render

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
    UserLoginSerilizer,
)

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
    serializer_class = UserLoginSerilizer

    def post(self, request):
        data = request.data #request.POST
        serializer = UserLoginSerilizer(data=data)
        if serializer.is_valid(raise_exception=True):
            print(serializer.is_valid(raise_exception=True))
            new_data = serializer.data
            return Response(new_data, status=HTTP_200_OK)
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)




