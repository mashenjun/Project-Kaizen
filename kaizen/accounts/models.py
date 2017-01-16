from mongoengine import *

from django.utils.deprecation import CallableFalse, CallableTrue
# Create your models here.

# class fakeUser(AbstractBaseUser):
#     """
#     Custom user class.
#     """
#     email = models.EmailField('email address', unique=True, db_index=True)
#     joined = models.DateTimeField(auto_now_add=True)
#     is_active = models.BooleanField(default=True)
#     is_admin = models.BooleanField(default=False)
#     USERNAME_FIELD = 'email'
#     def __unicode__(self):
#         return self.email


class User(Document):
    email = EmailField('email address')
    username = StringField('username', unique=True, db_index=True)
    password = StringField()
    is_active = BooleanField(default=True)
    is_admin = BooleanField(default=False)

    @property
    def is_authenticated(self):
        """
        Always return True. This is a way to tell if the user has been
        authenticated in templates.
        """
        return CallableTrue