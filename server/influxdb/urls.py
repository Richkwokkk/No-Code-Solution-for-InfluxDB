from django.urls import path

from .views import (
    RetrieveBucketsView,
)

urlpatterns = [
    path("buckets", RetrieveBucketsView.as_view()),
]