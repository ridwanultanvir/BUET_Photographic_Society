from django.urls import path
from post import views 
 
urlpatterns = [ 
    path('api/upload',views.upload),
]