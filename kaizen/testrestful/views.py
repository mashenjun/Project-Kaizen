# Create your views here.
from rest_framework import generics
from .serializers import EmployeeSerilizer
from testconnect.models import Employee
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly
)

class EmployeeView(generics.ListAPIView):
    """
    Returns a list of all authors.
    """
    serializer_class = EmployeeSerilizer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset_list = Employee.objects
        print(queryset_list)
        return queryset_list










