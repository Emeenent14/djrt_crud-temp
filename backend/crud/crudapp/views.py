from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Student
from .serializers import YourModelSerializer


# Create your views here.

class StudentView(APIView):
    def get(self, request):
        students = Student.objects.all()
        serializer = YourModelSerializer(students, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = YourModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
class StudentDetailView(APIView):
    def get(self, pk):
        try:
            student = Student.objects.get(id=pk)
            serializer = YourModelSerializer(student)
            return Response(serializer.data)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=404)
        
    def put(self, request, pk):
        try:
            student = Student.objects.get(id=pk)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=404)
        
        serializer = YourModelSerializer(instance=student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, pk):
        try:
            student = Student.objects.get(id=pk)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=404)
        
        student.delete()
        return Response({'message': 'Item deleted'}, status=204)
