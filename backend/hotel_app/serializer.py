from .models import Room,Extras,Booking
#, CheckIn
from rest_framework import serializers
class ExtrasSerializer(serializers.ModelSerializer):
    class Meta:
        model=Extras
        fields='__all__'

class RoomSerializer(serializers.ModelSerializer):
    extras=ExtrasSerializer(many=True,read_only=True)
    class Meta:
        model = Room
        fields = ['id','name','description','price','is_booked','capacity','size','breakfast','pets','img','img1','img2','img3','extras']


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'


#class CheckinSerializer(serializers.ModelSerializer):
#    room_id = serializers.IntegerField(source='room.pk')
#    room_slug = serializers.SlugField(source='room.room_slug')
#    customer_id = serializers.IntegerField(source='customer.pk')
#    customer_name = serializers.CharField(source='customer.username')
#
#    class Meta:
#        model = CheckIn
#        fields = ('phone_number', 'email', 'customer_id', 'customer_name', 'room_id', 'room_slug',)
#