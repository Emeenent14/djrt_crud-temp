from django.urls import path
from .views import StudentView, StudentDetailView

urlpatterns = [
    path('students/', StudentView.as_view(), name='student-list'),  # For listing and creating
    path('students/<int:pk>/', StudentDetailView.as_view(), name='student-detail'),  # For retrieving, updating, and deleting
]

