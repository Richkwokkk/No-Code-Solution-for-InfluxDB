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


class RetrieveMeasurementsView(generics.GenericAPIView):
    def post(self, request, bucket):        
        influx_url = 'http://influxdb:8086'
        try:
            time_start = request.data.get("time_start")
            time_stop= request.data.get("time_stop")
            token = request.headers.get("Authorization").replace("Token ", "")
            with InfluxDBClient(url=influx_url, token=token, org="ATSYS") as client:
                tables = client.query_api().query(
                    f'from(bucket: \"{bucket}\") \
                        |> range(start: {time_start}, stop: {time_stop})'
                )
                measurements_name = []
                for record in tables[0].records:
                    measurement = record.get_measurement()
                    if measurement not in measurements_name:
                        measurements_name.append(measurement)
            return JsonResponse({"measurements": measurements_name})
        except requests.exceptions.RequestException as e:
            return JsonResponse({"error": "Failed to connect to the external API", "details": str(e)}, status=500)
