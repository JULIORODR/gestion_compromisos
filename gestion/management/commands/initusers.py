from django.core.management.base import BaseCommand
from gestion.models import Usuario

class Command(BaseCommand):
    help = 'Crea usuarios admin y base precargados'

    def handle(self, *args, **kwargs):
        if not Usuario.objects.filter(username='admin').exists():
            Usuario.objects.create_superuser(
                username='admin',
                email='admin@email.com',
                password='admin123',
                rol='admin'
            )
            self.stdout.write(self.style.SUCCESS('Usuario admin creado'))
        else:
            self.stdout.write('Usuario admin ya existe')

        if not Usuario.objects.filter(username='base').exists():
            Usuario.objects.create_user(
                username='base',
                email='base@email.com',
                password='base123',
                rol='base'
            )
            self.stdout.write(self.style.SUCCESS('Usuario base creado'))
        else:
            self.stdout.write('Usuario base ya existe')
