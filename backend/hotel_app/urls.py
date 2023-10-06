from django.contrib import admin
from django.urls import path, include
from .views import RoomView, RoomDetailView, BookingCreateApiView,getBookingByIdView,getMyBookingsView,updateBookingToPaidView


app_name = 'hotel_app'

urlpatterns = [
    path('rooms/',RoomView, name="rooms_list"),
    path('room/<str:pk>/', RoomDetailView, name="single_room"),
    path('book/', BookingCreateApiView, name='book_room'),
    path('booking/add/', BookingCreateApiView, name='book_room'),
    path('booking/<int:pk>/', getBookingByIdView, name="particular-booking"),
    path('mybookings/', getMyBookingsView, name="my_bookings"),
     path('booking/<int:pk>/pay/', updateBookingToPaidView, name="payment_update"),
]
