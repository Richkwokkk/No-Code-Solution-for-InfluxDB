import requests
from rest_framework import generics
from django.http import JsonResponse

from influxdb_client import InfluxDBClient

import logging
logger = logging.getLogger(__name__)


class RetrieveBucketsView(generics.GenericAPIView):
    def get(self, request):        
        try:
            influx_url = 'http://influxdb:8086'
            token = request.headers.get("Authorization").replace("Token ", "")
            with InfluxDBClient(url=influx_url, token=token) as client:
                response = client.buckets_api().find_buckets()
                buckets_name = [bucket.name for bucket in response.buckets]
            return JsonResponse({"buckets": buckets_name})
        except requests.exceptions.RequestException as e:
            return JsonResponse({"error": "Failed to connect to the external API", "details": str(e)}, status=500)

    def get_1(self, request):
        api_url = 'http://influxdb:8086/api/v2/buckets'
        try:
            authorization_token = request.headers.get("Authorization")
            headers = {
                'Authorization': authorization_token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            response = requests.get(api_url, headers=headers)
            if response.status_code == 200:
                buckets_data = response.json()["buckets"]
                buckets_name = [bucket["name"] for bucket in buckets_data]
                return JsonResponse({"buckets": buckets_name}, status=response.status_code)
            else:
                return JsonResponse({
                    "error": "External API returned an error",
                    "status_code": response.status_code,
                    "response": response.text
                }, status=response.status_code)
        except requests.exceptions.RequestException as e:
            return JsonResponse({"error": "Failed to connect to the external API", "details": str(e)}, status=500)
