from django.conf.urls import url

from . import views

urlpatterns = [
    # /upload/
    url(r'^uploader/$', views.CreateUploaderView.as_view(), name='uploader-create-list'),
    url(r'^uploader/(?P<id>.+)/$',views.RetrieveUploaderView.as_view(),name='uploader-retrieve'),
    url(r'^filter-uploader/(?P<userid>.+)/$', views.FilterUploaderbyUserView.as_view(), name='uploader-filter-user'),
    url(r'^uploader/(?P<id>.+)/edit$', views.EditUploaderView.as_view(), name='uploader-edit'),
    url(r'^getphoto/(?P<id>.+)/$',views.uploader_photo_view,name='get-photo'),
    url(r'^post/$',views.CreatePostView.as_view(),name='post-create-list'),
    url(r'^retrieve-post/$',views.RetrievePostView.as_view(),name='post-retrieve'),
    url(r'^retrieve-post/(?P<id>.+)/$',views.RetrievePostView.as_view(),name='post-retrieve'),
    url(r'^list-post/$',views.ListPostView.as_view(),name='post-list'),
    url(r'^comment/$',views.insert_comment_post,name='comment-create')
]