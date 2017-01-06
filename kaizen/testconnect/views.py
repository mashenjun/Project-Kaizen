from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from pymongo import MongoClient

databaseName = "smaple_database"
connection = MongoClient('localhost', 27017)

db = connection[databaseName]
employees = db['employees']



def index(request):
    result = "DATABASE CONTENT -> "
    print "searching"
    for e in employees.find():
        result = result+"name: "+e["name"]+"  age: "+str(e["age"]);
        return HttpResponse(result);