from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt import views as jwt_views

from .views import getRegisterUser, MyTokenObtainPairView,getUserProfile,updateUserProfile,getUsers

app_name = 'accounts_app'

urlpatterns = [
    
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', getRegisterUser,name='register'),
     path('profile/',getUserProfile,name="users-profile"),
     path('profile/update/',updateUserProfile,name="users-profile-update"),
      path('',getUsers,name="users"),
]

