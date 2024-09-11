import requests
from rest_framework import generics
from django.http import JsonResponse
from django.http import HttpResponse


class LoginView(generics.GenericAPIView):
    def post(self, request):
        influx_url = 'http://influxdb:8086/api/v2/signin'
        try:
            username = request.data.get("username")
            password = request.data.get("password")
            response_influxdb = requests.post(influx_url, auth=(username, password))
            if response_influxdb.status_code == 204:
                cookies_dict = requests.utils.dict_from_cookiejar(response_influxdb.cookies)
                response = JsonResponse({
                    'message': 'Sign-in successful',
                })
                response.set_cookie(
                    key='influxdb-oss-session', 
                    value=cookies_dict.get('influxdb-oss-session'),
                    domain="localhost",
                    httponly=True,
                    samesite="Strict",
                )
                return response
            else:
                return JsonResponse({
                    "error": "External API returned an error",
                    "status_code": response_influxdb.status_code,
                    "response": response_influxdb.text
                }, status=response_influxdb.status_code)
        except requests.exceptions.RequestException as e:
            return JsonResponse({"error": "Failed to connect to the external API", "details": str(e)}, status=500)

