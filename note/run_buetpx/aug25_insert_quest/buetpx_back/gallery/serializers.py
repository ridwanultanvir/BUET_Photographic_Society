from rest_framework import serializers 
from gallery.models import Gallery
from buetpx.serializers import PostSerializer2

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ('id',
                  'title',
                  'owner_id'
                  )
        # print("############done##################")

class GalleryPostSerializer(serializers.ModelSerializer):
    # posts=serializers.SlugRelatedField(read_only=True, slug_field='post_title' ,many=True)
    # posts=PostSerializer2(many=True, read_only=True)
    class Meta:
        model =  Gallery
        fields = ('id',
                  'title',
                  'posts'
                  )       