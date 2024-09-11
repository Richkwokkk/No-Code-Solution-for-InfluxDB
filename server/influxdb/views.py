import requests
from rest_framework import generics
from django.http import JsonResponse

from influxdb_client import InfluxDBClient

import logging
logger = logging.getLogger(__name__)

class RetrieveBucketsView(generics.GenericAPIView):
    def get(self, request):
        influx_url = 'http://influxdb:8086/api/v2/buckets'
        try:
            cookies = request.COOKIES.get('influxdb-oss-session')
            headers = {
                "Accept": "Application/json",
                "Content-Type": "application/json",
                "Cookie": f"influxdb-oss-session={cookies}"
            }

            response_influxdb = requests.get(influx_url, headers=headers)

            if response_influxdb.status_code == 200:
                response_data = response_influxdb.json()
                buckets_name = [bucket["name"] for bucket in response_data["buckets"]]
                return JsonResponse({"buckets": buckets_name})

            elif response_influxdb.status_code == 401:
                logger.error(f"Unauthorized access: {response_influxdb.text}")
                return JsonResponse({"error": "Unauthorized access"}, status=401)

            elif response_influxdb.status_code == 404:
                logger.error(f"Resource not found: {response_influxdb.text}")
                return JsonResponse({"error": "Resource not found"}, status=404)

            elif response_influxdb.status_code == 500:
                logger.error(f"Internal server error from external API: {response_influxdb.text}")
                return JsonResponse({"error": "Server error"}, status=500)

            else:
                logger.error(f"Unexpected error from external API: {response_influxdb.status_code}, {response_influxdb.text}")
                return JsonResponse({"error": "Unexpected error occurred"}, status=500)

        except requests.exceptions.RequestException as e:
            # Log the details of the exception
            logger.error(f"Failed to connect to the external API: {str(e)}")
            return JsonResponse({"error": "Failed to connect to the external API"}, status=500)