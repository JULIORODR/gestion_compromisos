from rest_framework import serializers
from .models import Usuario, Acta, Compromiso, Gestion

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'rol']

class GestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gestion
        fields = ['id', 'fecha', 'descripcion', 'archivo', 'creador']

class CompromisoSerializer(serializers.ModelSerializer):
    gestiones = GestionSerializer(many=True, read_only=True)
    class Meta:
        model = Compromiso
        fields = ['id', 'descripcion', 'responsable', 'estado', 'gestiones']

class ActaSerializer(serializers.ModelSerializer):
    compromisos = CompromisoSerializer(many=True, read_only=True)
    responsables = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all(), many=True)
    creador = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Acta
        fields = ['id', 'titulo', 'estado', 'fecha', 'pdf', 'creador', 'responsables', 'compromisos']
