import requests
from rest_framework import generics
from django.http import JsonResponse

from influxdb_client import InfluxDBClient

import logging
logger = logging.getLogger(__name__)


class RetrieveBucketsView(generics.GenericAPIView):
    def get(self, request):
        influx_url = 'http://influxdb:8086/api/v2/buckets'
        try:
            cookies = request.COOKIES.get('influxdb-oss-session')
            headers = {
                "Accept": "Application/json",
                "Content-Type": "application/json",
                "Cookie": f"influxdb-oss-session={cookies}"
            }
            response_influxdb = requests.get(influx_url, headers=headers)
            if response_influxdb.status_code == 200:
                response_data = response_influxdb.json()
                logger.error(response_data)
                buckets_name = [bucket["name"] for bucket in response_data["buckets"]]
                response = JsonResponse({
                    "buckets": buckets_name
                })
                return response
            else:
                return JsonResponse({
                    "error": "External API returned an error",
                    "status_code": response_influxdb.status_code,
                    "response": response_influxdb.text
                }, status=response_influxdb.status_code)
        except requests.exceptions.RequestException as e:
            return JsonResponse({"error": "Failed to connect to the external API", "details": str(e)}, status=500)


class RetrieveMeasurementsView(generics.GenericAPIView):
    def post(self, request, bucket):        
        influx_url = 'http://influxdb:8086/api/v2/buckets'
        try:
            time_start = request.data.get("time_start")
            time_stop= request.data.get("time_stop")
            cookies = request.COOKIES.get('influxdb-oss-session')
            logger.error(cookies)
            headers = {
                "Accept": "Application/json",
                "Content-Type": "application/json",
                "Cookie": f"influxdb-oss-session={cookies}"
            }

            # tables = client.query_api().query(
            #         f'from(bucket: \"{bucket}\") \
            #             |> range(start: {time_start}, stop: {time_stop})'
            #     )
            # measurements_name = []
            # for record in tables[0].records:
            #     measurement = record.get_measurement()
            #     if measurement not in measurements_name:
            #         measurements_name.append(measurement)

            response_influxdb = requests.get(influx_url, headers=headers)
            if response_influxdb.status_code == 200:
                response_data = response_influxdb.json()
                logger.error(response_data)
                buckets_name = [bucket["name"] for bucket in response_data["buckets"]]
                response = JsonResponse({
                    "measurements": measurements_name
                })
                return response
            else:
                return JsonResponse({
                    "error": "External API returned an error",
                    "status_code": response_influxdb.status_code,
                    "response": response_influxdb.text
                }, status=response_influxdb.status_code)
        except requests.exceptions.RequestException as e:
            return JsonResponse({"error": "Failed to connect to the external API", "details": str(e)}, status=500)