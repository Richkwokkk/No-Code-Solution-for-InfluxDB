import logging
import requests
from rest_framework import generics
from django.http import JsonResponse

logger = logging.getLogger(__name__)

class RetrieveBucketsView(generics.GenericAPIView):
    def get(self, request):
        influxdb_url = 'http://influxdb:8086'
        try:
            cookies = request.COOKIES.get('login-session')
            if not cookies:
                return JsonResponse({"error": "Unauthorized access"}, status=401)

            headers = {
                "Cookie": f"influxdb-oss-session={cookies}",
                "Accept": "application/json",
                "Content-Type": "application/json",
            }

            response = requests.get(f"{influxdb_url}/api/v2/buckets", headers=headers)
            response_data = response.json()

            if response.status_code == 401:
                logger.error(f"Unauthorized access: {response_data.get('message', 'No details')}")
                return JsonResponse({"error": "Unauthorized access"}, status=401)
            elif response.status_code == 404:
                logger.error(f"Bucket not found: {response_data.get('message', 'No details')}")
                return JsonResponse({"error": "Bucket not found"}, status=404)
            elif response.status_code == 500:
                logger.error(f"Internal server error: {response_data.get('message', 'No details')}")
                return JsonResponse({"error": "Internal server error"}, status=500)
            elif response.status_code != 200:
                logger.error(f"Unexpected error: {response_data.get('message', 'No details')}")
                return JsonResponse({"error": "Unexpected error"}, status=response.status_code)

            buckets_name = [bucket["name"] for bucket in response_data.get("buckets", [])]
            return JsonResponse({"buckets": buckets_name})

        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to connect to the server: {str(e)}")
            return JsonResponse({"error": "Failed to connect to the server"}, status=500)

        except ValueError as e:
            logger.error(f"Invalid response format: {str(e)}")
            return JsonResponse({"error": "Invalid response format"}, status=500)

        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return JsonResponse({"error": "Unexpected error"}, status=500)
