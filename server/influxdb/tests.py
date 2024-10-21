import json
from unittest.mock import patch, MagicMock
from django.test import TestCase
from django.http import HttpRequest
from rest_framework.test import APIRequestFactory
from .views import RetrieveBucketsView
from parameterized import parameterized

@patch('django.db.connection')
class RetrieveBucketsViewTests(TestCase):
    def setUp(self, mock_connection):
        self.factory = APIRequestFactory()
        self.view = RetrieveBucketsView.as_view()
        self.mock_connection = mock_connection

    @patch('influxdb.views.RetrieveBucketsView.get_headers')
    @patch('influxdb.views.RetrieveBucketsView.make_request')
    def test_successful_retrieval(self, mock_make_request, mock_get_headers):
        request = self.factory.get('/api/buckets/')
        mock_get_headers.return_value = {'Cookie': 'mock_cookie'}
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"buckets": [{"name": "bucket1"}, {"name": "bucket2"}]}
        mock_make_request.return_value = mock_response

        response = self.view(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), {"buckets": ["bucket1", "bucket2"]})

    @patch('influxdb.views.RetrieveBucketsView.get_headers')
    @patch('influxdb.views.RetrieveBucketsView.make_request')
    def test_empty_bucket_list(self, mock_make_request, mock_get_headers):
        request = self.factory.get('/api/buckets/')
        mock_get_headers.return_value = {'Cookie': 'mock_cookie'}
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"buckets": []}
        mock_make_request.return_value = mock_response

        response = self.view(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), {"buckets": []})

    @patch('influxdb.views.RetrieveBucketsView.get_headers')
    @patch('influxdb.views.RetrieveBucketsView.make_request')
    def test_influxdb_unavailable(self, mock_make_request, mock_get_headers):
        request = self.factory.get('/api/buckets/')
        mock_get_headers.return_value = {'Cookie': 'mock_cookie'}
        mock_make_request.side_effect = Exception("Connection failed")

        response = self.view(request)

        self.assertEqual(response.status_code, 500)
        self.assertEqual(json.loads(response.content), {"error": "Failed to connect to the server"})

    @patch('influxdb.views.RetrieveBucketsView.get_headers')
    @patch('influxdb.views.RetrieveBucketsView.make_request')
    def test_timeout(self, mock_make_request, mock_get_headers):
        request = self.factory.get('/api/buckets/')
        mock_get_headers.return_value = {'Cookie': 'mock_cookie'}
        mock_make_request.side_effect = Exception("Request timed out")

        response = self.view(request)

        self.assertEqual(response.status_code, 504)
        self.assertEqual(json.loads(response.content), {"error": "Request timed out"})

    @patch('influxdb.views.RetrieveBucketsView.get_headers')
    @patch('influxdb.views.RetrieveBucketsView.make_request')
    def test_malformed_response(self, mock_make_request, mock_get_headers):
        request = self.factory.get('/api/buckets/')
        mock_get_headers.return_value = {'Cookie': 'mock_cookie'}
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.side_effect = json.JSONDecodeError("Malformed JSON", "", 0)
        mock_make_request.return_value = mock_response

        response = self.view(request)

        self.assertEqual(response.status_code, 500)
        self.assertEqual(json.loads(response.content), {"error": "Invalid response format"})

    @parameterized.expand([
        (418, "I'm a teapot"),
        (500, "Internal Server Error"),
        (503, "Service Unavailable"),
    ])
    @patch('influxdb.views.RetrieveBucketsView.get_headers')
    @patch('influxdb.views.RetrieveBucketsView.make_request')
    def test_unexpected_status_code(self, status_code, error_message, mock_make_request, mock_get_headers):
        request = self.factory.get('/api/buckets/')
        mock_get_headers.return_value = {'Cookie': 'mock_cookie'}
        mock_response = MagicMock()
        mock_response.status_code = status_code
        mock_response.text = error_message
        mock_make_request.return_value = mock_response

        response = self.view(request)

        self.assertEqual(response.status_code, status_code)
        self.assertEqual(json.loads(response.content), {"error": error_message})

    @patch('influxdb.views.RetrieveBucketsView.get_headers')
    @patch('influxdb.views.RetrieveBucketsView.make_request')
    def test_large_bucket_list(self, mock_make_request, mock_get_headers):
        request = self.factory.get('/api/buckets/')
        mock_get_headers.return_value = {'Cookie': 'mock_cookie'}
        large_bucket_list = [{"name": f"bucket{i}"} for i in range(1000)]
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"buckets": large_bucket_list}
        mock_make_request.return_value = mock_response

        response = self.view(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json.loads(response.content)["buckets"]), 1000)

    @patch('influxdb.views.RetrieveBucketsView.get_headers')
    @patch('influxdb.views.RetrieveBucketsView.make_request')
    def test_special_characters_in_bucket_name(self, mock_make_request, mock_get_headers):
        request = self.factory.get('/api/buckets/')
        mock_get_headers.return_value = {'Cookie': 'mock_cookie'}
        special_buckets = [{"name": "bucket!@#$%^&*()"}]
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"buckets": special_buckets}
        mock_make_request.return_value = mock_response

        response = self.view(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content), {"buckets": ["bucket!@#$%^&*()"]})

    @patch('os.environ.get')
    @patch('influxdb.views.RetrieveBucketsView.get_headers')
    @patch('influxdb.views.RetrieveBucketsView.make_request')
    def test_custom_influxdb_url(self, mock_make_request, mock_get_headers, mock_environ_get):
        request = self.factory.get('/api/buckets/')
        mock_get_headers.return_value = {'Cookie': 'mock_cookie'}
        mock_environ_get.return_value = 'http://custom-influxdb:9999'
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"buckets": []}
        mock_make_request.return_value = mock_response

        response = self.view(request)

        self.assertEqual(response.status_code, 200)
        mock_make_request.assert_called_once_with(
            headers={'Cookie': 'mock_cookie'},
            url='http://custom-influxdb:9999/api/v2/buckets'
        )
