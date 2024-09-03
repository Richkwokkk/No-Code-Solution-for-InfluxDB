import requests
from rest_framework import generics
from django.http import JsonResponse
from django.http import HttpResponse


class LoginView(generics.GenericAPIView):
    def post(self, request):
        api_url = 'http://influxdb:8086/api/v2/signin'
        username = request.data.get("username")
        password = request.data.get("password")
        try:
            response = requests.post(api_url, auth=(username, password))
            if response.status_code == 204:
                cookies_dict = requests.utils.dict_from_cookiejar(response.cookies)
                cookie_value = cookies_dict.get('influxdb-oss-session')
                response_to_frontend = JsonResponse({
                    'message': 'Sign-in successful',
                })
                response_to_frontend.set_cookie('set-cookie', cookie_value)
                return response_to_frontend
            else:
                return JsonResponse({
                    "error": "External API returned an error",
                    "status_code": response.status_code,
                    "response": response.text
                }, status=response.status_code)
        except requests.exceptions.RequestException as e:
            return JsonResponse({"error": "Failed to connect to the external API", "details": str(e)}, status=500)
