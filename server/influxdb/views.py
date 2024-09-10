from rest_framework import generics
from django.http import JsonResponse
from influxdb_client import InfluxDBClient, ApiException
import requests
import logging
logger = logging.getLogger(__name__)


class RetrieveBucketsView(generics.GenericAPIView):
    def get(self, request):        
        
        influx_url = 'http://influxdb:8086'
        token = request.headers.get("Authorization")

        if not token or not token.startswith("Token "):
            logging.warning("Unauthorized access attempt: Missing or malformed Authorization header")
            return JsonResponse({"error": "Unauthorized access"}, status=401)
        
        token = token.replace("Token ", "")

        try:
            with InfluxDBClient(url=influx_url, token=token) as client:
                try:
                    response = client.buckets_api().find_buckets()
                    buckets_name = [bucket.name for bucket in response.buckets]
                    return JsonResponse({"buckets": buckets_name})
                except ApiException as e:
                    logger.error(f"InfluxDB API error: {str(e)}")
                    if e.status == 401:
                        return JsonResponse({"error": "Unauthorized access"}, status=401)
                    elif e.status == 404:
                        return JsonResponse({"error": "Resource not found"}, status=404)
                    elif e.status == 500:
                        return JsonResponse({"error": "Server error"}, status=500)
                    else:
                        return JsonResponse({"error": "Unexpected error"}, status=500)
        
        except requests.exceptions.RequestException as e:
            logger.error(f"Connection error: {str(e)}")
            return JsonResponse({"error": "Server error"}, status=500)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return JsonResponse({"error": "Unexpected error"}, status=500)