#!/bin/bash

# Script to start both backend and frontend servers

echo "🚀 Starting Order Status Application..."
echo ""

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0
    else
        return 1
    fi
}

# Check if ports are already in use
if check_port 8000; then
    echo "⚠️  Port 8000 is already in use. Backend might already be running."
fi

if check_port 5173; then
    echo "⚠️  Port 5173 is already in use. Frontend might already be running."
fi

echo "📦 Setting up backend..."
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies if needed
if [ ! -f "venv/.installed" ]; then
    echo "Installing backend dependencies..."
    pip install -r requirements.txt
    touch venv/.installed
fi

echo "✅ Backend dependencies installed"
echo ""
echo "🌐 Starting backend server on http://localhost:8000"
echo "   (Press Ctrl+C to stop)"
echo ""

# Start backend in background
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Go back to root and start frontend
cd ../frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

echo "✅ Frontend dependencies installed"
echo ""
echo "🎨 Starting frontend server on http://localhost:5173"
echo "   (Press Ctrl+C to stop)"
echo ""

# Start frontend
npm run dev &
FRONTEND_PID=$!

# Wait for user interrupt
echo ""
echo "✨ Both servers are running!"
echo "   Backend:  http://localhost:8000"
echo "   Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"

# Trap Ctrl+C and kill both processes
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT

# Wait for both processes
wait
