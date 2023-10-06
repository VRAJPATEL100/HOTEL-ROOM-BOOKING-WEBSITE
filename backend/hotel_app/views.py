from django.shortcuts import get_object_or_404
from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .models import Room,Booking
#, Booking, CheckIn
from .serializer import RoomSerializer, BookingSerializer
#, CheckinSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework import status
from datetime import datetime

@api_view(['GET'])
def RoomView(request):
    rooms=Room.objects.all()
    serializer=RoomSerializer(rooms,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def RoomDetailView(request,pk):
    room=Room.objects.get(pk=pk)
    serializer=RoomSerializer(room,context={"request":request})
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def BookingCreateApiView(request):
    user = request.user
    data = request.data
    roomname=data['room']['name']
    booking = Booking.objects.create(
            customer=user,
            bookingname=data['bookingname'],
            room=roomname,
            checking_date=data['checking_date'],
            checkout_date=data['checkout_date'],
            phone_number=data['phone_number'],
            email=data['email'],
            totalPrice=data['totalprice'],
        )
    serializer=BookingSerializer(booking,many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBookingByIdView(request, pk):

    user = request.user

    try:
        booking = Booking.objects.get(id=pk)
        if user.is_staff or booking.customer == user:
            serializer = BookingSerializer(booking, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this booking'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Booking does not exist'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyBookingsView(request):
    user = request.user
    bookings = user.booking_set.all()
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateBookingToPaidView(request, pk):
    booking = Booking.objects.get(id=pk)

    booking.isPaid = True
    booking.paidAt = datetime.now()
    booking.save()

    return Response('Booking was paid')