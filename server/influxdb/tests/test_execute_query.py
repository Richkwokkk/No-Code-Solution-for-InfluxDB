import json

from rest_framework import status
import requests

from base.base_test import BaseTest


class ExecuteQueryViewView(BaseTest):
    def setUp(self):
        super(ExecuteQueryViewView, self).setUp()
        self.url_login = "http://0.0.0.0:8000/api/v1/accounts/signin/"
        self.url_retrieve = "http://0.0.0.0:8000/api/v1/influxdb/query"
        self.maxDiff = None

    def test_retrieve_success_existing_data(self):
        payload_login = {
            "username": "dev1",
            "password": "developer@123influx"
        }
        response = self.client.post(self.url_login, payload_login, format='json')
        cookies = response.cookies.get('login-session').value

        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        request_body = {
            "query": "from(bucket: \"bucket1\") |> range(start: 2022-01-01T08:00:00Z, stop: 2022-01-01T20:00:01Z) |> filter(fn: (r) => r._measurement == \"home\" and r._field == \"hum\")",
        }
        params = {"organization": "ATSYS"}
        response = requests.post(
            self.url_retrieve, 
            headers=headers, 
            params=params, 
            json=request_body,
            cookies={'login-session': cookies}

        )
        response_data = response.json()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        with open("influxdb/tests/query_expected.json") as f:
            expected = json.load(f)
        self.assertEqual(response_data['result'], expected)
