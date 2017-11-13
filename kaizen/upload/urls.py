from django.conf.urls import url

from . import views

urlpatterns = [
    # /upload/
    # apis related with uploaders
    url(r'^uploader/$', views.CreateListUploaderView.as_view(), name='uploader-create-list'),
    url(r'^uploader/(?P<id>.+)/$',views.RetrieveUploaderView.as_view(),name='uploader-retrieve'),
    url(r'^filter/uploader/(?P<userid>.+)/$', views.FilterUploaderbyUserView.as_view(), name='uploader-filter-user'),
    url(r'^uploader/(?P<id>.+)/edit$', views.EditUploaderView.as_view(), name='uploader-edit'),
    url(r'^filter/uploaderByPostCatalogue/(?P<catalogue>.+)/$', views.FilterUploaderbyPostCatalogueView.as_view(), name='uploader-filter-postCatalogue'),

    # apis related with posts
    url(r'^post/$', views.CreateListPostView.as_view(), name='post-create-list'),
    # url(r'^retrieve-post/$',views.RetrievePostView.as_view(),name='post-retrieve'),
    url(r'^post/(?P<id>.+)/$',views.RetrievePostView.as_view(),name='post-retrieve'),
    url(r'^post/(?P<id>.+)/edit$',views.EditPostView.as_view(),name='post-edit'),
    url(r'^filter/post/(?P<id>.+)/$', views.FilterPostbyUploaderView.as_view(), name='post-filter-uploader'),
    url(r'^filter/post_catalogue/(?P<catalogue>.+)/$', views.FilterPostbyCatalogueView.as_view(), name='post-filter-catalogue'),
    url(r'^search/post/(?P<keyword>.+)/$', views.SearchPostView.as_view(), name='post-search'),
    # url(r'^list-post/$',views.ListPostView.as_view(),name='post-list'),

    # apis related with comments (TODO)
    url(r'^comment/$',views.insert_comment_post,name='comment-create'),

    # utils apis for the purpose of creating uploader and post
    url(r'^getphoto/(?P<id>.+)/$',views.uploader_photo_view,name='get-photo'),
    url(r'^query/province/$',views.query_province,name='province-query'),
    url(r'^query/province/(?P<province_code>\d+)/$',views.query_city,name='city-query'),
    url(r'^query/province/(?P<province_code>\d+)/(?P<city_code>\d+)/$', views.query_district, name='district-query'),
    url(r'^query/catalogue/$',views.list_catalogue,name='catalogue-list'),
    url(r'^query/catalogue/(?P<catalogue>.+)/$',views.query_catalogue,name='catalogue-query'),
]