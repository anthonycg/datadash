from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests
import json
from dotenv import load_dotenv
import os

app = FastAPI()

load_dotenv()

origins = ["http://localhost:3000","http://192.168.1.114:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("API_GATEWAY_ID")

@app.post("/getWeather")
async def get_weather_data(request: Request):
    # Parse JSON body from the request
    print(f"API Key: {api_key}")
    body = await request.json()
    lat = body.get("lat")
    lon = body.get("lon")

    # Log the request body
    print("Request body:", body)

    # Construct URL with query parameters
    lambda_url = f"https://{api_key}.execute-api.us-east-2.amazonaws.com/stage1/getWeather?lat={lat}&lon={lon}"

    # Fetch data from Lambda endpoint with requests
    try:
        response = requests.post(lambda_url)
        response_data = response.json()  # Parse JSON response
        # Return the data with the original request for frontend logging
        return {"data": response_data, "request_body": body}
    except requests.RequestException as e:
        return {"error": str(e), "request_body": body}
    
