from django.urls import path
from .views import LoginView, ActaListView, ActaDetailView, GestionCreateView, MediaProtectedView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('actas/', ActaListView.as_view(), name='actas-list'),
    path('actas/<int:pk>/', ActaDetailView.as_view(), name='actas-detail'),
    path('gestiones/', GestionCreateView.as_view(), name='gestion-create'),
    path('media/<str:filename>/', MediaProtectedView.as_view(), name='media-protected'),
]
