import json

import requests
from rest_framework import generics
from django.http import JsonResponse


class ExecuteQueryView(generics.GenericAPIView):
    def post(self, request, organization):        
        influxdb_url = 'http://influxdb:8086'
        try:
            query = request.data.get("query")
            cookies = request.COOKIES.get('login-session')
            headers_check = {
                "Cookie": f"influxdb-oss-session={cookies}",
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
            data = {
                "query": query,
                "type": "flux"
            }
            # Check query format
            response_check = requests.post(f"{influxdb_url}/api/v2/query/analyze", headers=headers_check, data=json.dumps(data))
            if response_check.status_code != 200:
                response_data = response_check.json()
                return JsonResponse({
                    "error": "InfluxDB API returned an error",
                    "details": response_data["message"]
                }, status=response_check.status_code)
            # Execute query
            headers_query = {
                "Cookie": f"influxdb-oss-session={cookies}",
                "Accept": "application/csv",
                "Content-Type": "application/vnd.flux"
            }
            response_org = requests.get(f"{influxdb_url}/api/v2/orgs", headers=headers_query)
            response_data = response_org.json()
            if response_org.status_code != 200:
                return JsonResponse({
                    "error": "InfluxDB API returned an error",
                    "details": response_data["message"]
                }, status=response_org.status_code)
            orgs_data = response_data['orgs']
            params = None
            for org in orgs_data:
                if org['name'] == organization:
                    params = {
                        "orgID": org["id"]
                    }
            if params is None:
                return JsonResponse({
                    "error": "Organization not found"
                }, status=404)
            response_query = requests.post(f"{influxdb_url}/api/v2/query", headers=headers_query, params=params, data=query)
            if response_query.status_code != 200:
                response_data = response_query.json()
                return JsonResponse({
                    "error": "InfluxDB API returned an error",
                    "details": response_data["message"]
                }, status=response_query.status_code)
            return JsonResponse({
                "result": response_query.text
            })
        except requests.exceptions.RequestException as e:
            return JsonResponse({
                "error": "Failed to connect to the server", 
                "details": str(e)
                }, status=500)
