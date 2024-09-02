from django.urls import path

from .views import (
    RetrieveBucketsView,
    RetrieveMeasurementsView
)

urlpatterns = [
    path("buckets", RetrieveBucketsView.as_view()),
    path("<str:bucket>/measurements", RetrieveMeasurementsView.as_view()),
]