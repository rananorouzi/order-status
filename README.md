# Order Status Dashboard

A real-time order status tracking web application built with Python (FastAPI) backend and React + TypeScript frontend. Orders are automatically grouped by status (received, inProgress, readyToPickup) and displayed in separate columns. The frontend automatically updates when order statuses change, and includes dark/light mode support.

## Features

- **Real-time Updates**: Frontend automatically polls the API every 2 seconds to reflect order status changes
- **Auto Status Changes**: Backend automatically changes order statuses every 20 seconds for demonstration
- **Status Grouping**: Orders are automatically grouped into three columns:
  - Received (Blue)
  - inProgress (Amber/Yellow)
  - readyToPickup (Green)
- **Dark/Light Mode**: Toggle between dark and light themes with persistent preference
- **Responsive Design**: Column layout on desktop, row layout on mobile
- **Modern UI**: Built with TailwindCSS for a clean, responsive design
- **Type Safety**: Full TypeScript support with strict type checking
- **Fake Data**: Includes fake order data for demonstration purposes
- **Comprehensive Testing**: Unit tests for both frontend (Vitest) and backend (pytest)
- **Code Quality**: ESLint configuration for code quality and consistency

## Tech Stack

### Backend
- **Python 3.8+**
- **FastAPI**: Modern, fast web framework for building APIs
- **Pydantic**: Data validation using Python type annotations
- **pytest**: Testing framework
- **asyncio**: Background tasks for automatic status changes

### Frontend
- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **TanStack Query (React Query)**: Powerful data synchronization for React
- **TailwindCSS**: Utility-first CSS framework with dark mode support
- **Vitest**: Fast unit test framework
- **ESLint**: Code linting and quality

## Project Structure

```
order-status/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── test_main.py         # pytest tests
│   ├── requirements.txt     # Python dependencies
│   └── run.sh              # Script to start server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── OrderDashboard.tsx    # Main dashboard component
│   │   │   ├── OrderBox.tsx          # Status box component
│   │   │   ├── OrderCard.tsx         # Individual order card
│   │   │   ├── ThemeToggle.tsx       # Dark/light mode toggle
│   │   │   └── __tests__/            # Component tests
│   │   ├── hooks/
│   │   │   └── useTheme.ts           # Theme management hook
│   │   ├── utils/
│   │   │   ├── api.ts                # API functions
│   │   │   ├── constants.ts          # Constants and colors
│   │   │   └── orderHelpers.ts       # Order utility functions
│   │   ├── types/
│   │   │   └── index.ts              # TypeScript type definitions
│   │   ├── App.tsx                   # Root component
│   │   ├── main.tsx                  # Entry point
│   │   └── index.css                 # Global styles
│   ├── .eslintrc.cjs                 # ESLint configuration
│   ├── package.json                   # Node dependencies
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── vite.config.ts                 # Vite configuration
│   └── tailwind.config.js             # TailwindCSS configuration
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
python3 -m venv venv
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

**Note**: The backend automatically changes order statuses every 20 seconds for demonstration purposes.

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
    "id": "123456",
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

**Valid statuses:** `received`, `inProgress`, `readyToPickup`

### POST `/api/orders/simulate-change`
Manually simulates a random order status change (for demo purposes).

## Features Details

### Dark/Light Mode
- Click the theme toggle button in the header to switch between dark and light modes
- Theme preference is saved in localStorage
- Automatically detects system preference on first visit

### Responsive Layout
- **Desktop**: Three columns side-by-side
- **Mobile**: Single column (stacks vertically)

### Color Scheme
- **Received**: Blue (#2563eb / #60a5fa)
- **inProgress**: Amber (#d97706 / #fbbf24)
- **readyToPickup**: Green (#16a34a / #4ade80)

### Auto Status Changes
The backend automatically changes 1-3 random order statuses every 20 seconds to demonstrate real-time updates.

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

### Linting

Run ESLint:
```bash
cd frontend
npm run lint
```

## Code Quality

### TypeScript
- Strict mode enabled
- Full type safety throughout
- Path aliases for clean imports (`@components/`, `@/types/`, etc.)

### ESLint Rules
- React best practices
- TypeScript strict checking
- Unused variable detection
- Consistent code style

## Development

### Adding New Orders

You can modify the `initialize_fake_data()` function in `backend/main.py` to add more orders or change the initial data.

### Changing Poll Interval

The polling interval can be adjusted in `frontend/src/components/OrderDashboard.tsx` by modifying the `refetchInterval` value in the useQuery hook.

### Customizing Styles

TailwindCSS classes can be modified in the component files. The configuration is in `frontend/tailwind.config.js`.

### Path Aliases

The project uses path aliases for cleaner imports:
- `@/` - Root of src directory
- `@components/` - Components directory
- `@types/` - Type definitions
- `@utils/` - Utility functions
- `@hooks/` - Custom React hooks

## How It Works

1. **Backend**: The FastAPI server maintains an in-memory list of orders with fake data. Orders can be retrieved, updated, and their statuses automatically change every 20 seconds.

2. **Frontend**: The React application uses TanStack Query to fetch orders from the API. The query is configured to automatically refetch every 2 seconds, providing real-time updates.

3. **Status Grouping**: Orders are grouped by their status and displayed in separate columns on the dashboard.

4. **Real-time Updates**: When an order status changes (either through the API or automatic simulation), the frontend automatically detects the change on the next poll and updates the UI accordingly.

5. **Theme Management**: Theme state is managed through a custom hook that persists preferences in localStorage and applies the appropriate CSS classes.
