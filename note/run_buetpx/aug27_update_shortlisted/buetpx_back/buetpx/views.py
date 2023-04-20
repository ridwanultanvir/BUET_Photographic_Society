from unicodedata import category
from django.shortcuts import render
from django.http.response import JsonResponse
# from Backend.buetpx_back.buetpx.models import Place
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from buetpx.models import Tutorial,Post,Comment,UserAccount,Tags, Category,Place, Like
from buetpx.serializers import LikeSerializer,CommentSerializer, CommentSerializer2, TutorialSerializer,PostSerializer,PlaceSerializer,UserAccountSerializer,CategorySerializer
# from buetpx.serializers import CommentSerializer, CommentSerializer2, TutorialSerializer,PostSerializer,PlaceSerializer,UserAccountSerializer,CategorySerializer

from buetpx.serializers import PostSerializer2, CommentInsertSerializer, LikeInsertSerializer, LikeInsertSerializer2
# from buetpx.serializers import PostSerializer2, CommentInsertSerializer

from rest_framework.decorators import api_view

from django.db.models import Count
import json


# notun add korsi 
from django.db.models.query import QuerySet
from django.http import HttpResponse


@api_view(['GET', 'POST', 'DELETE'])
def tutorial_list(request):
   
# Retrieve objects (with condition)

    if request.method == 'GET':
        tutorials = Tutorial.objects.all()
        
        title = request.GET.get('title', None)
        if title is not None:
            tutorials = tutorials.filter(title__icontains=title)
        
        tutorials_serializer = TutorialSerializer(tutorials, many=True)
        return JsonResponse(tutorials_serializer.data, safe=False)

# Create a new object

    elif request.method == 'POST':
        tutorial_data = JSONParser().parse(request)
        tutorial_serializer = TutorialSerializer(data=tutorial_data)

        if tutorial_serializer.is_valid():
             tutorial_serializer.save()
             return JsonResponse(tutorial_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(tutorial_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    # GET list of tutorials, POST a new tutorial, DELETE all tutorials
 
 
# 
@api_view(['GET', 'PUT', 'DELETE'])
def tutorial_detail(request, pk):
    # find tutorial by pk (id)
    try: 
        tutorial = Tutorial.objects.get(pk=pk) 

        if request.method == 'GET': 
            tutorial_serializer = TutorialSerializer(tutorial) 
            return JsonResponse(tutorial_serializer.data)
        
        elif request.method == 'PUT': 
            tutorial_data = JSONParser().parse(request) 
            tutorial_serializer = TutorialSerializer(tutorial, data=tutorial_data) 
            if tutorial_serializer.is_valid(): 
                tutorial_serializer.save() 
                return JsonResponse(tutorial_serializer.data) 
            return JsonResponse(tutorial_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

        elif request.method == 'DELETE': 
            tutorial.delete() 
            return JsonResponse({'message': 'Tutorial was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
   
    except Tutorial.DoesNotExist: 
        return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    # GET / PUT / DELETE tutorial
    
        
@api_view(['GET'])
def tutorial_list_published(request):
    # GET all published tutorials
    tutorials = Tutorial.objects.filter(published=True)
        
    if request.method == 'GET': 
        tutorials_serializer = TutorialSerializer(tutorials, many=True)
        return JsonResponse(tutorials_serializer.data, safe=False)



@api_view(['GET'])
def post_detail(request):
    # GET all published tutorials
    # fields = ('id','post_title','post_date','photo_url')
    # posts = Post.objects.values('id','post_title','post_date','photo_url','owner')
    posts = Post.objects.all()
    
    if request.method == 'GET': 
        posts_serializer = PostSerializer(posts, many=True)
        return JsonResponse(posts_serializer.data, safe=False)
        


# NOTUN korsi =========
@api_view(['POST'])
def insert_like(request):
   
    if request.method == 'POST':
        print("")
        
        like_data = JSONParser().parse(request)
        like_serializer = LikeInsertSerializer(data=like_data)

        if like_serializer.is_valid():
                like_serializer.save()
                return JsonResponse(like_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(like_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
def delete_like(request, post_id, user_id):
    # find tutorial by pk (id)
    try: 
        like_obj = Like.objects.filter(post_id=post_id, user_id=user_id)
        if not like_obj.exists():
            print("The like does NOT exist")
            return JsonResponse({'message': 'The like does NOT exist'})

        if request.method == 'DELETE': 
            like_obj.delete() 
            return JsonResponse({'message': 'Like was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
   
    except Tutorial.DoesNotExist: 
        return JsonResponse({'message': 'The like does NOT exist'}, status=status.HTTP_404_NOT_FOUND) 
 

    


# json field server accept 
@api_view(['POST'])
def insert_comment(request):
   
    if request.method == 'POST':
        
        comment_data = JSONParser().parse(request)
        comment_serializer = CommentInsertSerializer(data=comment_data)

        if comment_serializer.is_valid():
                comment_serializer.save()
                return JsonResponse(comment_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(comment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def post_list(request):
   
# Retrieve objects (with condition)

    if request.method == 'GET':
        posts = Post.objects.all()
        
        # title = request.GET.get('post_title', None)
        # if title is not None:
        #     posts = posts.filter(title__icontains=title)
        
        post_serializer = PostSerializer(posts, many=True)
        return JsonResponse(post_serializer.data, safe=False)

# # Create a new object

    elif request.method == 'POST':
        post_data = JSONParser().parse(request)
        post_serializer = PostSerializer(data=post_data)

        if post_serializer.is_valid():
             post_serializer.save()
             return JsonResponse(post_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(post_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# categroy; .. ; comment_list 

@api_view(['GET', 'POST'])
def post_list_by_catname(request, catname):
       
# Retrieve objects (with condition)

    if request.method == 'GET':
        posts = Post.objects.all()
        # get posts by category name
        posts = posts.filter(category__name=catname)
        
        post_serializer = PostSerializer(posts, many=True)
        return JsonResponse(post_serializer.data, safe=False)


# @Tanvir post_list_by_tagname
@api_view(['GET', 'POST'])
def post_list_by_tagname(request, tagname):
       
# Retrieve objects (with condition)

    if request.method == 'GET':
        posts = Post.objects.all()
        # get posts by category name
        posts = posts.filter(tags__name=tagname)
        
        post_serializer = PostSerializer(posts, many=True)
        return JsonResponse(post_serializer.data, safe=False)

@api_view(['GET'])
def get_post_by_id(request,id):
    
    if request.method == 'GET':
        post = Post.objects.get(pk=id)       
        singe_post_serializer = PostSerializer(post
                , context={'fields': ['id',
                  'post_title',
                  'post_date',
                  'photo_url',
                  'owner',
                  'category',
                  'place',
                  'tags']}
                )
        return JsonResponse(singe_post_serializer.data, safe=False)

@api_view(['Get'])
def get_place_by_id(request,id):
    
    if request.method == 'GET':
        post = Place.objects.get(pk=id)       
        place_serializer = PlaceSerializer(post
                )
        return JsonResponse(place_serializer.data, safe=False)



    

@api_view(['Get'])
def get_post_with_uid_by_id(request,id):
    
    if request.method == 'GET':
        post = Post.objects.get(pk=id)       
        singe_post_serializer = PostSerializer2(post
                , context={'fields': ['id',
                  'post_title',
                  'post_date',
                  'photo_url',
                  'owner',
                  'category',
                  'place',
                  'tags']}
                )
        return JsonResponse(singe_post_serializer.data, safe=False)

@api_view(['Get'])

def get_comments_by_postid(request,postid):
    
    if request.method == 'GET':
        comments = Comment.objects.filter(post=postid)               
        comment_serializer = CommentSerializer(comments,many = True)
        return JsonResponse(comment_serializer.data, safe=False)
    

@api_view(['Get'])

def get_num_likes_by_postid(request,postid):
    
    if request.method == 'GET':       

        num_likes = Like.objects.filter(post=postid).count()
        print("likes:", num_likes)         
        response_data = {}
        response_data['num_likes'] = num_likes
        return JsonResponse(response_data, safe=False)


#  notun add kortesi 11 Aug ; check korte je already like deya ase kina 
@api_view(['Get'])
def get_check_if_user_already_liked(request,postid,user_id):
    
    if request.method == 'GET':       

        this_post_likes = Like.objects.filter(post=postid)
        this_post_user_likes = this_post_likes.filter(user=user_id)
        response_data = {}
        response_data['num_likes_this_user'] = 1
        if this_post_user_likes.count() == 0:
            response_data['num_likes_this_user'] = 0
            
        return JsonResponse(response_data, safe=False)    


# oi post_id er all like dey
@api_view(['Get'])
def get_like_info_this_post(request,postid,user_id):
    
    if request.method == 'GET':       

        this_post_likes = Like.objects.filter(post=postid)
        print("this_post_likes:", this_post_likes)
        print("likes:", this_post_likes)         
        response_data = {}
        response_data['num_likes'] = 1
        like_serializer = LikeSerializer(this_post_likes, many=True)
        return JsonResponse(like_serializer.data, safe=False)
    
@api_view(['Get'])

def get_likes_by_postid_prev(request,postid):
    
    if request.method == 'GET':
        likes = Like.objects.filter(post=postid)
        # results = Members.objects.raw('SELECT * FROM myapp_members GROUP BY designation')  
        
        # count = Entry.objects.filter(headline__contains='Lennon').count()
        num_likes = Like.objects.filter(post=postid).count()
        # another ===
        # likes = Like.objects.all().query
        # likes.group_by = ['post']
        # likes = QuerySet(query=likes, model=Like)
        # another ===
        # pubs = Publisher.objects.annotate(num_books=Count('book'))
        likes = likes.annotate(num_likes=Count('post'))
        # likes = (Like.objects
        #         .values('post')
        #         .annotate(dcount=Count('post'))
        #         .order_by()
        #     )           
        print(type(num_likes))  
        print("likes:", num_likes) 
        
        response_data = {}
        response_data['num_likes'] = num_likes
        
   
        # like_serializer = LikeSerializer(likes,many = True)
        return JsonResponse(response_data, safe=False)


@api_view(['Get'])

def get_post_by_categoryid(request,id):
    
    if request.method == 'GET':
        posts = Post.objects.filter(category=id)               
        post_serializer = PostSerializer(posts,many = True)
        return JsonResponse(post_serializer.data, safe=False)



# notun add korsi @tanvir
@api_view(['Get'])

def get_post_by_tagid(request,id):
    
    if request.method == 'GET':
        # posts = Post.objects.filter(posts__in=[id])    
        posts = Post.objects.filter(tags__in = id)    
        post_serializer = PostSerializer(posts,many = True)
        return JsonResponse(post_serializer.data, safe=False)

@api_view(['Get'])

def get_post_by_categorylist(request,list):
    
    my_list = list.split(",")

    post_serializer_all = []
    if request.method == 'GET':
        for list_id in my_list:
         
            posts = Post.objects.filter(category=list_id) 
                          
            post_serializer = PostSerializer(posts,many = True)
       
            post_serializer_all.append(post_serializer.data)
            
        return JsonResponse(post_serializer_all, safe=False)

@api_view(['Get'])

def get_post_by_categoryname(request,name):
    
    if request.method == 'GET':
        posts = Post.objects.filter(category=name)               
        post_serializer = PostSerializer(posts,many = True)
        return JsonResponse(post_serializer.data, safe=False)
    
    
# @api_view(['Get'])
# def get_comment_by_post_id(request,id):

#     # tutorials = Tutorial.objects.filter(published=True)
        
#     # if request.method == 'GET': 
#     #     tutorials_serializer = TutorialSerializer(tutorials, many=True)
#     #     return JsonResponse(tutorials_serializer.data, safe=False)
#     comments = Comment.objects.filter(post=id)  
#     if request.method == 'GET':
#         comment_serializer = CommentSerializer3(comments, many = True)
#         return JsonResponse(comment_serializer.data, safe=False)



  

#     # GET list of tutorials, POST a new tutorial, DELETE all tutorials
 

@api_view(['GET','POST'])
def get_categories(request):

    if request.method == 'GET':
        categories = Category.objects.all()
        categories_serializer = CategorySerializer(categories, many=True)
        return JsonResponse(categories_serializer.data, safe=False)

    elif request.method == 'POST':
        cat_data = JSONParser().parse(request)
        cat_serializer = CategorySerializer(data=cat_data)

        if cat_serializer.is_valid():
             cat_serializer.save()
             return JsonResponse(cat_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(cat_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# get user by id
@api_view(['GET', 'POST'])
def get_user_by_id(request,id):
   
# Retrieve objects (with condition)

    if request.method == 'GET':
        user = UserAccount.objects.get(pk = id)
        user_serializer = UserAccountSerializer(user)
        return JsonResponse(user_serializer.data, safe=False)

# get_post_with_uid_by_id



# get user by id
@api_view(['GET', 'POST'])
def get_all_user(request):
   
# Retrieve objects (with condition)

        
        # id = request.GET.get('id', None)
        
        
        user = UserAccount.objects.all()
        user_serializer = UserAccountSerializer(user, many=True)
        return JsonResponse(user_serializer.data, safe=False)

@api_view(['DELETE'])

def delete_comment(request,list):
     my_list = list.split("&")

     comment_id = my_list[0]
     user_id = my_list[1]

     print(comment_id)
     print(user_id)
     comment_id = int(comment_id)


     comment =  Comment.objects.get(pk=comment_id) 
     print(comment)

     if request.method == 'DELETE': 
            comment.delete() 
            return JsonResponse({'message': 'comment was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_places(request):
    if request.method == 'GET':
        places = Place.objects.all()
        place_serializer = PlaceSerializer(places, many=True)
        return JsonResponse(place_serializer.data, safe=False)