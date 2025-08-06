# from rest_framework import generics
from rest_framework import generics, permissions
from .models import Usuario, Acta, Compromiso, Gestion
from .serializers import UsuarioSerializer, ActaSerializer, CompromisoSerializer, GestionSerializer
# Endpoint para listar usuarios
class UsuarioListView(generics.ListAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.IsAuthenticated]
from rest_framework.views import APIView
from rest_framework import generics, permissions, status, serializers
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.http import FileResponse, Http404
from django.conf import settings
from .models import Usuario, Acta, Compromiso, Gestion
from django.db.models import Q
from .serializers import UsuarioSerializer, ActaSerializer, CompromisoSerializer, GestionSerializer
import os

class LoginView(APIView):
    permission_classes = []
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UsuarioSerializer(user).data,
                'rol': user.rol
            })
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

class ActaListView(generics.ListCreateAPIView):
    serializer_class = ActaSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        queryset = Acta.objects.all() if user.rol == 'admin' else Acta.objects.filter(Q(creador=user) | Q(responsables=user)).distinct()
        estado = self.request.query_params.get('estado')
        titulo = self.request.query_params.get('titulo')
        fecha = self.request.query_params.get('fecha')
        if estado:
            queryset = queryset.filter(estado=estado)
        if titulo:
            queryset = queryset.filter(titulo__icontains=titulo)
        if fecha:
            queryset = queryset.filter(fecha=fecha)
        return queryset

    def perform_create(self, serializer):
        serializer.save(creador=self.request.user)

class ActaDetailView(generics.RetrieveAPIView):
    queryset = Acta.objects.all()
    serializer_class = ActaSerializer
    permission_classes = [permissions.IsAuthenticated]

class GestionCreateView(generics.CreateAPIView):
    serializer_class = GestionSerializer
    permission_classes = [permissions.IsAuthenticated]
    def perform_create(self, serializer):
        archivo = self.request.FILES.get('archivo')
        if archivo:
            ext = os.path.splitext(archivo.name)[1].lower()
            if ext not in ['.pdf', '.jpg']:
                raise serializers.ValidationError({'archivo': 'Solo se permiten archivos PDF o JPG'})
            if archivo.size > 5*1024*1024:
                raise serializers.ValidationError({'archivo': 'Archivo demasiado grande (máx 5MB)'})
        serializer.save(creador=self.request.user)

class MediaProtectedView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, filename):
        file_path = os.path.join(settings.MEDIA_ROOT, filename)
        if not os.path.exists(file_path):
            raise Http404
        return FileResponse(open(file_path, 'rb'))
