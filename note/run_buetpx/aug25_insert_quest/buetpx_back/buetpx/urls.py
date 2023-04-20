# from django.conf.urls import re_path  
from django.urls import path
from buetpx import views 

 
urlpatterns = [ 
    path ('api/categories', views.get_categories),
    path ('api/categories/posts/<id>', views.get_post_by_categoryid),
    # http://127.0.0.1:8000/api/categories/posts/list/1,2,3
    path ('api/categories/posts/list/<list>', views.get_post_by_categorylist),
    # path ('api/categories/<name>/posts', views.get_post_by_categoryname),
    path ('api/posts', views.post_list),
	path ('api/posts_with_tagid/<id>', views.get_post_by_tagid),
    path ('api/posts_by_tagname/<tagname>', views.post_list_by_tagname),
 
	path ('api/posts_by_cat/<catname>', views.post_list_by_catname),
    path ('api/posts/<id>', views.get_post_by_id),
  
    path ('api/places/<id>', views.get_place_by_id),
    path ('api/post_detail', views.post_detail),
    path ('api/posts/<catname>', views.post_list_by_catname),

    path ('api/posts/<postid>/comments', views.get_comments_by_postid),
    path ('api/comments/<postid>', views.get_comments_by_postid),
    path ('api/likes/<postid>', views.get_num_likes_by_postid),
    path ('api/check_likes/<postid>/<user_id>', views.get_check_if_user_already_liked),
    # path ('api/tags/<postid>', views.get_tags_by_postid),

    # path ('api/comments/<id>', views.get_comment_by_id),
    # path ('api/comments_post/<id>', views.get_comment_by_post_id),

    path ('api/users', views.get_all_user),
    
    path ('api/user/<id>', views.get_user_by_id),
    path ('api/posts_with_uid/<id>', views.get_post_with_uid_by_id),
    path ('api/comment_insert', views.insert_comment),
    path ('api/insert_like', views.insert_like),
    path ('api/delete_like/<post_id>/<user_id>', views.delete_like),

    # path ('api/insert_like2', views.insert_like2),
    # api: photo_url pathabi; request query theke; pic tar ekta tag list return 
    
    
]