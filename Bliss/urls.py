from django.urls import path
from .views import signup, login, create_order

urlpatterns = [
    path('signup/', signup),
    path('login/', login),
    path('create-order/', create_order),
]
