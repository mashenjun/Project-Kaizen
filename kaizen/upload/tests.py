from django.test import TestCase

# Create your tests here.
from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class AccountTests(APITestCase):
    def test_create_account(self):
        """
        Ensure we can create a new account object.
        """
        url = reverse('uploader-create-list')
        data = {'birth_day': ['1992-09-02'],
                'name': ['test1'],
                'photo': [],
                'sex': ['M'],
                'user': ['587e2479c022f82939add180'],
                'home_town': ['Shanghai'],
                'location': [100,100]}
        response = self.client.post(url, data, format='json')
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, data)