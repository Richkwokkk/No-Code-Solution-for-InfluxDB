import logging
import requests
from rest_framework import generics
from django.http import JsonResponse
from django.conf import settings
from requests.exceptions import RequestException, Timeout
from json.decoder import JSONDecodeError

logger = logging.getLogger(__name__)

class RetrieveBucketsView(generics.GenericAPIView):
    INFLUXDB_URL = 'http://influxdb:8086'
    TIMEOUT = 10

    def get(self, request):
        try:
            cookies = request.COOKIES.get('login-session')
            if not cookies:
                return self.error_response("Unauthorized: Missing authentication token", status=401)

            headers = self.get_headers(cookies)
            response = self.make_request(headers)
            
            return self.handle_response(response)

        except Timeout:
            logger.error("Request to InfluxDB timed out")
            return self.error_response("Request timed out", status=504)
        except RequestException as e:
            logger.error(f"Failed to connect to the server: {str(e)}")
            return self.error_response("Failed to connect to the server", status=500)
        except JSONDecodeError as e:
            logger.error(f"Invalid JSON response: {str(e)}")
            return self.error_response("Invalid response format", status=500)
        except Exception as e:
            logger.exception(f"Unexpected error: {str(e)}")
            return self.error_response("Unexpected error", status=500)

    def get_headers(self, cookies):
        return {
            "Cookie": f"influxdb-oss-session={cookies}",
            "Accept": "application/json",
            "Content-Type": "application/json",
        }

    def make_request(self, headers):
        return requests.get(f"{self.INFLUXDB_URL}/api/v2/buckets", headers=headers, timeout=self.TIMEOUT)

    def handle_response(self, response):
        if response.status_code == 200:
            buckets_name = self.extract_bucket_names(response.json())
            return JsonResponse({"buckets": buckets_name})
        elif response.status_code == 401:
            logger.error("Unauthorized: Invalid or insufficient permissions")
            return self.error_response("Unauthorized: Invalid or insufficient permissions", status=401)
        elif response.status_code == 404:
            logger.error("Not found: Bucket not found")
            return self.error_response("Not found: Bucket not found", status=404)
        elif response.status_code == 500:
            logger.error("Internal server error: The server encountered an unexpected situation")
            return self.error_response("Internal server error", status=500)
        else:
            logger.error(f"Unexpected error: Status code {response.status_code}")
            return self.error_response("Unexpected error", status=response.status_code)

    def extract_bucket_names(self, data):
        return [bucket["name"] for bucket in data.get("buckets", [])]

    def error_response(self, message, status):
        return JsonResponse({"error": message}, status=status)