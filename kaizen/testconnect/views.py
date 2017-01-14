from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from testconnect.models import Employee,Student

# databaseName = "smaple_database"
# connection = MongoClient('localhost', 27017)
# db = connection[databaseName]
# employees = db['employees']


def index(request):
    employee = Employee.objects.create(
        email="pedro.kong@company.com",
        first_name="Pedro",
        last_name="Kong"
    )
    employee.save()
    result = "Success"
    # for e in employees.find():
    #     result = result+"name: "+e["name"]+"  age: "+str(e["age"]);
    return HttpResponse(result);

def student(request):
    student = Student.objects.create(
        email="pedro.kong@company.com",
        first_name="Pedro",
        last_name="Kong"
    )
    student.save()
    result = "Student Save Success"
    # for e in employees.find():
    #     result = result+"name: "+e["name"]+"  age: "+str(e["age"]);
    return HttpResponse(result);