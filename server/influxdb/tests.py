from django.test import TestCase
from django.urls import reverse
from unittest.mock import patch, Mock
from influxdb_client.client.exceptions import ApiException
import requests

class RetrieveBucketsViewTests(TestCase):
    
    def setUp(self):
        self.url = reverse('buckets')
        self.valid_token = 'Token valid_token_value'
        self.headers = {"Authorization": self.valid_token}

    @patch('influxdb_client.InfluxDBClient')
    def test_successful_response(self, mock_influx_client):
        # Mock the InfluxDB client and the find_buckets response
        mock_client_instance = mock_influx_client.return_value.__enter__.return_value
        mock_client_instance.buckets_api.return_value.find_buckets.return_value.buckets = [
            Mock(name='Bucket1'), Mock(name='Bucket2')
        ]
        
        response = self.client.get(self.url, **self.headers)
        
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, {"buckets": ["Bucket1", "Bucket2"]})

    @patch('influxdb_client.InfluxDBClient')
    def test_unauthorized_access(self, mock_influx_client):
        # Simulate a 401 Unauthorized error from the InfluxDB API
        mock_client_instance = mock_influx_client.return_value.__enter__.return_value
        mock_client_instance.buckets_api.return_value.find_buckets.side_effect = ApiException(status=401)
        
        response = self.client.get(self.url, **self.headers)
        
        self.assertEqual(response.status_code, 401)
        self.assertJSONEqual(response.content, {"error": "Unauthorized access"})

    @patch('influxdb_client.InfluxDBClient')
    def test_bucket_not_found(self, mock_influx_client):
        # Simulate a 404 Not Found error from the InfluxDB API
        mock_client_instance = mock_influx_client.return_value.__enter__.return_value
        mock_client_instance.buckets_api.return_value.find_buckets.side_effect = ApiException(status=404)
        
        response = self.client.get(self.url, **self.headers)
        
        self.assertEqual(response.status_code, 404)
        self.assertJSONEqual(response.content, {"error": "Resource not found"})

    @patch('influxdb_client.InfluxDBClient')
    def test_internal_server_error(self, mock_influx_client):
        # Simulate a 500 Internal Server Error from the InfluxDB API
        mock_client_instance = mock_influx_client.return_value.__enter__.return_value
        mock_client_instance.buckets_api.return_value.find_buckets.side_effect = ApiException(status=500)
        
        response = self.client.get(self.url, **self.headers)
        
        self.assertEqual(response.status_code, 500)
        self.assertJSONEqual(response.content, {"error": "Server error"})

    @patch('requests.get')
    def test_network_failure(self, mock_get):
        # Simulate a network failure when trying to connect to InfluxDB
        mock_get.side_effect = requests.exceptions.RequestException
        
        response = self.client.get(self.url, **self.headers)
        
        self.assertEqual(response.status_code, 500)
        self.assertJSONEqual(response.content, {"error": "Server error"})

    @patch('influxdb_client.InfluxDBClient')
    def test_unexpected_data_format(self, mock_influx_client):
        # Simulate an unexpected data format returned by the InfluxDB API
        mock_client_instance = mock_influx_client.return_value.__enter__.return_value
        mock_client_instance.buckets_api.return_value.find_buckets.return_value.buckets = None
        
        response = self.client.get(self.url, **self.headers)
        
        self.assertEqual(response.status_code, 500)
        self.assertJSONEqual(response.content, {"error": "Unexpected error"})

    def test_missing_authorization_header(self):
        # Test missing or malformed Authorization header
        response = self.client.get(self.url)
        
        self.assertEqual(response.status_code, 401)
        self.assertJSONEqual(response.content, {"error": "Unauthorized access"})
