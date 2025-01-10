from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock
from main import app
import pytest


client = TestClient(app)


mock_aapl_data = [
    {
        "date": "2024-09-28",
        "revenue": 391_035_000_000,
        "netIncome": 93_736_000_000
    },
    {
        "date": "2023-09-30",
        "revenue": 383_285_000_000,
        "netIncome": 96_995_000_000
    },
    {
        "date": "2022-09-24",
        "revenue": 394_328_000_000,
        "netIncome": 99_803_000_000
    },
    {
        "date": "2021-09-25",
        "revenue": 365_817_000_000,
        "netIncome": 94_680_000_000
    },
    {
        "date": "2020-09-26",
        "revenue": 274_515_000_000,
        "netIncome": 57_411_000_000
    },
]


@patch("httpx.AsyncClient.get")
@pytest.mark.parametrize(
    "params, expectedLength, code, validateSortFunc",
    [
        # Test Case 1: Filter by year range (2020-2024), year asc
        (
            {
                "min_year": 2020,
                "max_year": 2024,
                "sort_by": "year",
                "sort_order": "asc",
            },
            5,
            200,
            lambda data: int(data[0]["date"][:4]) <= int(data[1]["date"][:4]) <= int(data[2]["date"][:4]) <= int(data[3]["date"][:4]) <= int(data[4]["date"][:4])
        ),
        
        # Test Case 2: Filter by minimum revenue (>= 380 billion), net income desc
        (
            {
                "min_revenue": 380000000000,
                "sort_by": "netIncome",
                "sort_order": "desc",
            },
            3,
            200,
            lambda data: data[0]["netIncome"] >= data[1]["netIncome"] >= data[2]["netIncome"]
        ),
        
        # Test Case 3: Filter by maximum revenue (<= 375 billion), revnue asc
        (
            {
                "max_revenue": 375000000000,
                "sort_by": "revenue",
                "sort_order": "asc",
            },
            2,
            200,
            lambda data: data[0]["revenue"] <= data[1]["revenue"]
        ),
        
        # Test Case 4: Filter by year range (2021-2023) and net income range (>= 90 billion), year asc
        (
            {
                "min_year": 2021,
                "max_year": 2023,
                "min_net_income": 90000000000,
                "sort_by": "year",
                "sort_order": "asc",
            },
            3,
            200,
            lambda data: int(data[0]["date"][:4]) <= int(data[1]["date"][:4]) <= int(data[2]["date"][:4])
        ),
        
        # Test Case 5: Filter by year range (2020-2024), sorted by net income ascending
        (
            {
                "min_year": 2020,
                "max_year": 2024,
                "sort_by": "netIncome",
                "sort_order": "asc",
            },
            5,
            200,
            lambda data: data[0]["netIncome"] <= data[1]["netIncome"] <= data[2]["netIncome"] <= data[3]["netIncome"] <= data[4]["netIncome"]
        ),
        
        # Test Case 6: No filters, expect all, uear desc
        (
            {
                "sort_by": "year",
                "sort_order": "desc",
            },
            5,
            200,
            lambda data: int(data[0]["date"][:4]) >= int(data[1]["date"][:4]) >= int(data[2]["date"][:4]) >= int(data[3]["date"][:4]) >= int(data[4]["date"][:4])
        ),
        
        # Test Case 7: Test for invalid year range (min_year > max_year), expect empty result
        (
            {
                "min_year": 2025,
                "max_year": 2024,
                "sort_by": "year",
                "sort_order": "asc",
            },
            0,
            200,
            lambda data: len(data) == 0
        ),
    ],
    ids=[1, 2, 3, 4, 5, 6, 7]
)
def test_handle_get_annual_appl_income(mock_get, params, expectedLength, code, validateSortFunc):
    mock_response = AsyncMock()
    mock_response.status_code = 200
    mock_response.json = lambda: mock_aapl_data
    
    mock_get.return_value = mock_response

    response = client.get("/aapl/annual-income", params=params)

    assert response.status_code == code
    data = response.json()

    
    assert len(data) == expectedLength
    assert validateSortFunc(data)