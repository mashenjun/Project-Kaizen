from django.conf.urls import url

from . import views

urlpatterns = [
    # /upload/
    url(r'^uploader/$', views.CreateListUploaderView.as_view(), name='uploader-create-list'),
    url(r'^uploader/(?P<id>.+)/$',views.RetrieveUploaderView.as_view(),name='uploader-retrieve'),
    url(r'^filter/uploader/(?P<userid>.+)/$', views.FilterUploaderbyUserView.as_view(), name='uploader-filter-user'),
    url(r'^uploader/(?P<id>.+)/edit$', views.EditUploaderView.as_view(), name='uploader-edit'),
    url(r'^getphoto/(?P<id>.+)/$',views.uploader_photo_view,name='get-photo'),
    url(r'^post/$', views.CreateListPostView.as_view(), name='post-create-list'),
    # url(r'^retrieve-post/$',views.RetrievePostView.as_view(),name='post-retrieve'),
    url(r'^post/(?P<id>.+)/$',views.RetrievePostView.as_view(),name='post-retrieve'),
    url(r'^post/(?P<id>.+)/edit$$',views.EditPostView.as_view(),name='post-edit'),
    url(r'^filter/post/(?P<authorid>.+)/$', views.FilterPostbyUploaderView.as_view(), name='post-filter-uploader'),
    # url(r'^list-post/$',views.ListPostView.as_view(),name='post-list'),
    url(r'^comment/$',views.insert_comment_post,name='comment-create'),
    url(r'^query/province/$',views.query_province,name='province-query'),
    url(r'^query/province/(?P<province_code>\d+)/$',views.query_city,name='city-query'),
    # url(r'^query/province/(?P<province_code>\d+)/(?P<city_code>\d+)/$', views.query_district, name='district-query'),
]