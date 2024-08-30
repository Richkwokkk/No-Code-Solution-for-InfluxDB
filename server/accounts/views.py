import requests
from rest_framework import generics
from django.http import JsonResponse


class LoginView(generics.GenericAPIView):
    def post(self, request):
        api_url = 'http://0.0.0.0:8086/api/v2/signin'
        username = request.data.get("username")
        password = request.data.get("password")
        try:
            response = requests.post(api_url, auth=(username, password))
            # Check if the request was successful
            if response.status_code == 200:
                return JsonResponse({"message": "Sign-in successful", "data": response.json()})
            else:
                return JsonResponse({
                    "error": "External API returned an error",
                    "status_code": response.status_code,
                    "response": response.text
                }, status=response.status_code)
        except requests.exceptions.RequestException as e:
            return JsonResponse({"error": "Failed to connect to the external API", "details": str(e)}, status=500)
