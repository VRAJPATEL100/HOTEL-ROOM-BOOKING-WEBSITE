from django.db import models
from django.contrib.auth.models import User





class Room(models.Model):
    id=models.AutoField(primary_key=True,editable=False)
    name=models.CharField(max_length=100,null=False,blank=False)
    description=models.TextField(max_length=200,null=False,blank=False,default="")
    price = models.IntegerField(null=False,blank=False)
    is_booked = models.BooleanField(default=False)
    capacity = models.IntegerField(null=False,blank=False)
    size=models.CharField(max_length=100,null=False,blank=False,default="")
    breakfast=models.BooleanField(blank=False,default=False)
    pets=models.BooleanField(blank=False,default=False)
    img = models.ImageField(null=False,blank=False)
    img1=models.ImageField(null=False,blank=False,default="")
    img2=models.ImageField(null=False,blank=False,default="")
    img3=models.ImageField(null=False,blank=False,default="")
    

    def __str__(self):
        return self.name
class Extras(models.Model):
    id=models.AutoField(primary_key=True,editable=False)
    facilities=models.CharField(max_length=200,null=False,blank=False)
    room=models.ManyToManyField(Room,related_name='extras',default="")
    def __str__(self):
        return self.facilities

class Booking(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    customer = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    bookingname=models.CharField(max_length=200,null=False,blank=False,default="")
    room = models.CharField(max_length=250,blank=False,null=False)
    booking_date = models.DateTimeField(auto_now_add=True)
    checking_date = models.DateTimeField(blank=False, null=False)
    checkout_date = models.DateTimeField(null=False, blank=False)
    phone_number = models.IntegerField(null=False, blank=False)
    email = models.EmailField(null=False, blank=False)
    totalPrice = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    
    def __str__(self):
        return self.customer.username