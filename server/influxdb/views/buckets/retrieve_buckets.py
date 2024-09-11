import requests
from rest_framework import generics
from django.http import JsonResponse


class RetrieveBucketsView(generics.GenericAPIView):
    def get(self, request):
        influxdb_url = 'http://influxdb:8086'
        try:
            cookies = request.COOKIES.get('login-session')
            headers = {
                "Cookie": f"influxdb-oss-session={cookies}",
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
            response = requests.get(f"{influxdb_url}/api/v2/buckets", headers=headers)
            response_data = response.json()
            if response.status_code != 200:
                return JsonResponse({
                    "error": "InfluxDB API returned an error",
                    "details": response_data["message"]
                }, status=response.status_code)
            buckets_name = [bucket["name"] for bucket in response_data["buckets"]]
            response = JsonResponse({
                "buckets": buckets_name
            })
            return response
        except requests.exceptions.RequestException as e:
            return JsonResponse({
                "error": "Failed to connect to the server", 
                "details": str(e)
                }, status=500)
