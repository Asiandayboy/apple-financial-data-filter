from fastapi import FastAPI, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, Literal
from dotenv import load_dotenv
from datetime import datetime
import httpx
import os

load_dotenv()


API_KEY = os.getenv("API_KEY")
AAPL_API_URL = f"https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey={API_KEY}"


app = FastAPI()


env = os.getenv("ENV")
if env == "production":
    allowed_origins = ["https://aapl-finance-app.vercel.app"]
else:
    allowed_origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)



@app.get("/")
def handle_root():
    return {"message": "Hello there! This is the financial data filtering app :] "}








def filter_by_year(entry, min_year, max_year):
    year = int(entry.get("date")[:4])
    return (min_year is None or year >= min_year) and (max_year is None or year <= max_year)

def filter_by_revenue(entry, min_revenue, max_revenue):
    revenue = entry.get("revenue")
    return (min_revenue is None or revenue >= min_revenue) and (max_revenue is None or revenue <= max_revenue)

def filter_by_net_income(entry, min_net_income, max_net_income):
    net_income = entry.get("netIncome")
    return (min_net_income is None or net_income >= min_net_income) and (max_net_income is None or net_income <= max_net_income)



@app.get("/aapl/annual-income")
async def handle_get_annual_aapl_income(
    response: Response,
    min_year: Optional[int] = None, max_year: Optional[int] = None,
    min_revenue: Optional[float] = None, max_revenue: Optional[float] = None,
    min_net_income: Optional[float] = None, max_net_income: Optional[float] = None,
    sort_by: Literal["year", "revenue", "netIncome"] | None = None, sort_order: Literal["asc", "desc"] | None = None
):
    
    if max_year is None:
        max_year = datetime.now().year

    async with httpx.AsyncClient() as client:
        response = await client.get(AAPL_API_URL)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Server failed to fetch data from external API")
    
    aapl_data = response.json()

    def filter_and_sort_data(data):
        filtered_data = [
            entry for entry in data
            if filter_by_year(entry, min_year, max_year) and
                filter_by_revenue(entry, min_revenue, max_revenue) and
                filter_by_net_income(entry, min_net_income, max_net_income)
        ]

        if sort_by is None:
            return filtered_data

        if sort_by == "year":
            sort_key = lambda entry: int(entry.get("date")[:4])
        else:
            sort_key = lambda entry: entry.get(sort_by)

        reverse = sort_order == "desc"
        return sorted(filtered_data, key=sort_key, reverse=reverse)


    cleaned_data = filter_and_sort_data(aapl_data)

    response.status_code=200

    return cleaned_data