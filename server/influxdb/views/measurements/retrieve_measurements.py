import csv
from io import StringIO
import pandas as pd
from collections import defaultdict

import requests
from rest_framework import generics
from django.http import JsonResponse


class RetrieveMeasurementsView(generics.GenericAPIView):
    def post(self, request, organization, bucket):        
        influxdb_url = 'http://influxdb:8086'
        try:
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
                response_data = response_query.json()
                return JsonResponse({
                    "error": "InfluxDB API returned an error",
                    "details": response_data["message"]
                }, status=response_query.status_code)

            csv_content = response_query.text
            csv_file = StringIO(csv_content)
            reader = csv.DictReader(csv_file)
            tables = defaultdict(list)
            for row in reader:
                key = row['table']
                tables[key].append(row)
            flattened_data = []
            for key, value_list in tables.items():
                flattened_data.extend(value_list)
            df = pd.DataFrame(flattened_data)
            measurements = df['_measurement'].unique().tolist()

            response = JsonResponse({
                "measurements": measurements
            })
            return response
        except requests.exceptions.RequestException as e:
            return JsonResponse({
                "error": "Failed to connect to the server", 
                "details": str(e)
                }, status=500)
