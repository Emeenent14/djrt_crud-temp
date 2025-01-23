from django.db import models

# Create your models here.

class Student(models.Model):
    name = models.CharField(max_length=100)
    year = models.IntegerField()
    address = models.CharField(max_length=100)
    time = models.TimeField(auto_now=True)
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.name
