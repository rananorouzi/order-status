# Order Status Dashboard

A real-time order status tracking web application built with Python (FastAPI) backend and React frontend. Orders are automatically grouped by status (received, in progress, ready to pickup) and displayed in separate boxes. The frontend automatically updates when order statuses change.

## Features

- **Real-time Updates**: Frontend automatically polls the API every 2 seconds to reflect order status changes
- **Status Grouping**: Orders are automatically grouped into three categories:
  - Received
  - In Progress
  - Ready to Pickup
- **Modern UI**: Built with TailwindCSS for a clean, responsive design
- **Fake Data**: Includes fake order data for demonstration purposes
- **Comprehensive Testing**: Unit tests for both frontend (Vitest) and backend (pytest)

## Tech Stack

### Backend
- **Python 3.8+**
- **FastAPI**: Modern, fast web framework for building APIs
- **Pydantic**: Data validation using Python type annotations
- **pytest**: Testing framework

### Frontend
- **React 18**: UI library
- **Vite**: Fast build tool and dev server
- **TanStack Query (React Query)**: Powerful data synchronization for React
- **TailwindCSS**: Utility-first CSS framework
- **Vitest**: Fast unit test framework

## Project Structure

```
order-status/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── test_main.py         # pytest tests
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── OrderDashboard.tsx    # Main dashboard component
│   │   │   ├── OrderBox.tsx          # Status box component
│   │   │   ├── OrderCard.tsx         # Individual order card
│   │   │   └── __tests__/            # Component tests
│   │   ├── App.tsx                   # Root component
│   │   ├── main.tsx                  # Entry point
│   │   └── index.css                 # Global styles
│   ├── package.json                  # Node dependencies
│   ├── vite.config.ts                # Vite configuration
│   └── tailwind.config.ts            # TailwindCSS configuration
└── README.md
```

## Installation

### Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend server:
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### GET `/api/orders`
Returns all orders.

**Response:**
```json
[
  {
    "id": "12345",
    "customer_name": "John Doe",
    "items": ["Burger", "Fries", "Coke"],
    "status": "received",
    "created_at": "2024-01-01T10:00:00",
    "updated_at": "2024-01-01T10:00:00"
  }
]
```

### GET `/api/orders/{order_id}`
Returns a specific order by ID.

### PUT `/api/orders/{order_id}/status?status={status}`
Updates the status of an order.

**Valid statuses:** `received`, `in progress`, `ready to pickup`

### POST `/api/orders/simulate-change`
Simulates a random order status change (for demo purposes).

## Testing

### Backend Tests

Run pytest tests:
```bash
cd backend
pytest test_main.py -v
```

### Frontend Tests

Run Vitest tests:
```bash
cd frontend
npm test
```

Run tests with UI:
```bash
npm run test:ui
```

## How It Works

1. **Backend**: The FastAPI server maintains an in-memory list of orders with fake data. Orders can be retrieved, updated, and their statuses can be changed.

2. **Frontend**: The React application uses TanStack Query to fetch orders from the API. The query is configured to automatically refetch every 2 seconds, providing real-time updates.

3. **Status Grouping**: Orders are grouped by their status and displayed in separate boxes on the dashboard.

4. **Real-time Updates**: When an order status changes (either through the API or simulation), the frontend automatically detects the change on the next poll and updates the UI accordingly.

## Development

### Adding New Orders

You can modify the `initialize_fake_data()` function in `backend/main.py` to add more orders or change the initial data.

### Changing Poll Interval

The polling interval can be adjusted in `frontend/src/App.jsx` by modifying the `refetchInterval` value in the QueryClient configuration.

### Customizing Styles

TailwindCSS classes can be modified in the component files. The configuration is in `frontend/tailwind.config.js`.

