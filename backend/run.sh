#!/bin/bash
# Script to run the FastAPI backend server

uvicorn main:app --reload --port 8000
