from django.conf.urls import url

from . import views

urlpatterns = [
    # /upload/
    url(r'^uploader/$', views.CreateUploaderView.as_view(), name='uploader-create-list'),
    url(r'^getphoto/(?P<name>.+)/$',views.uploader_photo_view,name='get-photo'),
    url(r'^post/$',views.CreatePostView.as_view(),name='post-create-list'),
    url(r'^retrievepost/$',views.RetrievePostView.as_view(),name='post-retrieve'),
    url(r'^retrievepost/(?P<id>.+)/$',views.RetrievePostView.as_view(),name='post-retrieve'),
    url(r'^listpost/$',views.ListPostView.as_view(),name='post-list'),
    url(r'^comment/$',views.insert_comment_post,name='comment-create')
]