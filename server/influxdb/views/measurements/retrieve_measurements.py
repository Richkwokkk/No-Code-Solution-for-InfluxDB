import requests
from rest_framework import generics
from django.http import JsonResponse

import logging
logger = logging.getLogger(__name__)


class RetrieveMeasurementsView(generics.GenericAPIView):
    def post(self, request, organization, bucket):        
        influxdb_url = 'http://influxdb:8086'
        # try:
        time_start = request.data.get("time_start")
        time_stop = request.data.get("time_stop")

        cookies = request.COOKIES.get('login-session')
        headers = {
            "Cookie": f"influxdb-oss-session={cookies}",
            "Accept": "application/csv",
            "Content-Type": "application/vnd.flux"
        }
        params = {
            "orgID": organization
        }
        data = f'from(bucket: "{bucket}") |> range(start: {time_start}, stop: {time_stop})'
        response_query = requests.post(f"{influxdb_url}/api/v2/query", headers=headers, params=params, data=data)
        if response_query.status_code != 200:
            return JsonResponse({
                "error": "InfluxDB API returned an error",
                "details": response_query.text
            }, status=response_query.status_code)
        
        tables = response_query.text
        logger.error(tables)
        measurements = []
        for table in response_query:
            for record in table.records:
                measurements.append(record.get("measurement"))
            
        response = JsonResponse({
            "measurements": measurements
        })
        return response
        # except requests.exceptions.RequestException as e:
        #     return JsonResponse({
        #         "error": "Failed to connect to the server", 
        #         "details": str(e)
        #         }, status=500)
