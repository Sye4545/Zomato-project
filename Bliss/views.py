from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.models import Token

from .models import MenuItem, Order, OrderItem
from .serializers import SignupSerializer, LoginSerializer, OrderSerializer

# ================= SIGNUP API =================
@api_view(["POST"])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        first = serializer.validated_data["first_name"]
        last = serializer.validated_data["last_name"]
        email = serializer.validated_data["email"]
        phone = serializer.validated_data["phone"]
        password = serializer.validated_data["password"]

        if User.objects.filter(email=email).exists():
            return Response({"success": False, "message": "Email already exists"}, status=400)
        if User.objects.filter(username=phone).exists():
            return Response({"success": False, "message": "Phone already exists"}, status=400)

        # ✅ Hash password
        user = User.objects.create(
            username=phone,
            first_name=first,
            last_name=last,
            email=email,
            password=make_password(password)
        )

        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            "success": True,
            "message": "Account created successfully",
            "token": token.key
        }, status=201)

    return Response({"success": False, "message": serializer.errors}, status=400)

# ================= LOGIN API =================
@api_view(["POST"])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"success": False, "message": "Invalid data"}, status=400)

    email_or_phone = serializer.validated_data["email_or_phone"]
    password = serializer.validated_data["password"]

    user = None

    # Try login by email
    try:
        user_obj = User.objects.get(email=email_or_phone)
        user = authenticate(username=user_obj.username, password=password)
    except User.DoesNotExist:
        pass

    # Try login by phone (username)
    if user is None:
        user = authenticate(username=email_or_phone, password=password)

    if user is None:
        return Response({"success": False, "message": "Invalid credentials"}, status=400)

    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        "success": True,
        "message": "Login successful",
        "token": token.key,
        "user": {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": user.username
        }
    })

# ================= CREATE ORDER API =================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    data = request.data

    items = data.get("items")
    if not items:
        return Response({"success": False, "message": "No items in order."}, status=400)

    order = Order.objects.create(
        user=user,
        restaurant=data.get("restaurant", ""),
        total_price=data.get("total_price", 0),
        address=data.get("address", "")
    )

    for item in items:
        try:
            menu_item = MenuItem.objects.get(id=item["item_id"])
            OrderItem.objects.create(order=order, item=menu_item, quantity=item["quantity"])
        except MenuItem.DoesNotExist:
            return Response({"success": False, "message": f"Menu item {item['item_id']} does not exist."}, status=400)

    return Response({"success": True, "message": "Order created successfully."})
