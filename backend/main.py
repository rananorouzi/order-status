from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from datetime import datetime
import random
import uuid

app = FastAPI(title="Order Status API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Order(BaseModel):
    id: str
    customer_name: str
    items: List[str]
    status: str
    created_at: str
    updated_at: str


# In-memory storage for orders (simulating a database)
orders_db: List[Order] = []

# Initialize with some fake data
def initialize_fake_data():
    statuses = ["received", "in progress", "ready to pickup"]
    customers = ["John Doe", "Jane Smith", "Bob Johnson", "Alice Williams", "Charlie Brown"]
    items_list = [
        ["Burger", "Fries", "Coke"],
        ["Pizza", "Salad"],
        ["Tacos", "Nachos", "Margarita"],
        ["Sushi", "Miso Soup"],
        ["Pasta", "Garlic Bread", "Wine"],
    ]
    
    for i in range(15):
        status = random.choice(statuses)
        order = Order(
            id=str(random.randint(100000, 999999)),
            customer_name=random.choice(customers),
            items=random.choice(items_list),
            status=status,
            created_at=datetime.now().isoformat(),
            updated_at=datetime.now().isoformat(),
        )
        orders_db.append(order)


# Initialize fake data on startup
@app.on_event("startup")
async def startup_event():
    initialize_fake_data()


@app.get("/")
def read_root():
    return {"message": "Order Status API"}


@app.get("/api/orders", response_model=List[Order])
def get_orders():
    """Get all orders"""
    return orders_db


@app.get("/api/orders/{order_id}", response_model=Order)
def get_order(order_id: str):
    """Get a specific order by ID"""
    for order in orders_db:
        if order.id == order_id:
            return order
    return {"error": "Order not found"}


@app.put("/api/orders/{order_id}/status")
def update_order_status(order_id: str, status: str):
    """Update order status"""
    valid_statuses = ["received", "in progress", "ready to pickup"]
    if status not in valid_statuses:
        return {"error": f"Invalid status. Must be one of: {valid_statuses}"}
    
    for order in orders_db:
        if order.id == order_id:
            order.status = status
            order.updated_at = datetime.now().isoformat()
            return {"message": "Status updated", "order": order}
    return {"error": "Order not found"}


# Simulate order status changes for demo purposes
@app.post("/api/orders/simulate-change")
def simulate_order_change():
    """Simulate a random order status change for demo purposes"""
    if not orders_db:
        return {"message": "No orders to simulate"}
    
    order = random.choice(orders_db)
    old_status = order.status
    statuses = ["received", "in progress", "ready to pickup"]
    order.status = random.choice(statuses)
    order.updated_at = datetime.now().isoformat()
    
    return {
        "message": "Order status changed",
        "order_id": order.id,
        "old_status": old_status,
        "new_status": order.status
    }
