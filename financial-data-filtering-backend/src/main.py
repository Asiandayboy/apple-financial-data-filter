from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv()


API_KEY = os.getenv("API_KEY")

print(f'API KEY: {API_KEY}')

# app = FastAPI()


# @app.get("/")
# def handle_root():
#     return {"message": "Hello there! This is the financial data filtering app :] "}


# @app.get("")
# def handle_fetch_filtered_data():
#     return {}