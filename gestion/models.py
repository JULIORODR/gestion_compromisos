from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    ROL_CHOICES = (
        ('admin', 'Administrador'),
        ('base', 'Usuario Base'),
    )
    rol = models.CharField(max_length=10, choices=ROL_CHOICES, default='base')

class Acta(models.Model):
    ESTADO_CHOICES = (
        ('abierta', 'Abierta'),
        ('cerrada', 'Cerrada'),
    )
    titulo = models.CharField(max_length=255)
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES)
    fecha = models.DateField()
    pdf = models.FileField(upload_to='actas/', blank=True, null=True)
    creador = models.ForeignKey(Usuario, related_name='actas_creadas', on_delete=models.CASCADE)
    responsables = models.ManyToManyField(Usuario, related_name='actas_responsable')

class Compromiso(models.Model):
    acta = models.ForeignKey(Acta, related_name='compromisos', on_delete=models.CASCADE)
    descripcion = models.TextField()
    responsable = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    estado = models.CharField(max_length=20)

class Gestion(models.Model):
    compromiso = models.ForeignKey(Compromiso, related_name='gestiones', on_delete=models.CASCADE)
    fecha = models.DateField()
    descripcion = models.TextField()
    archivo = models.FileField(upload_to='gestiones/')
    creador = models.ForeignKey(Usuario, on_delete=models.CASCADE)

# Create your models here.
