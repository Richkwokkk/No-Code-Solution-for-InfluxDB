from django.urls import path

from .views import (
    RetrieveBucketsView,
    RetrieveMeasurementsView,
    RetrieveFieldsView
)


urlpatterns = [
    path("buckets", RetrieveBucketsView.as_view()),
    path("<str:organization>/<str:bucket>/measurements", RetrieveMeasurementsView.as_view()),
    path("<str:organization>/<str:bucket>/measurements", RetrieveMeasurementsView.as_view()),
    path("<str:organization>/<str:bucket>/<str:measurement>/fields", RetrieveFieldsView.as_view()),
]
