import pytest
from fastapi.testclient import TestClient
from main import app, orders_db, initialize_fake_data

client = TestClient(app)


@pytest.fixture(autouse=True)
def reset_db():
    """Reset the orders database before each test"""
    orders_db.clear()
    initialize_fake_data()
    yield
    orders_db.clear()


def test_read_root():
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Order Status API"}


def test_get_orders():
    """Test getting all orders"""
    response = client.get("/api/orders")
    assert response.status_code == 200
    orders = response.json()
    assert isinstance(orders, list)
    assert len(orders) > 0
    
    # Check order structure
    if orders:
        order = orders[0]
        assert "id" in order
        assert "customer_name" in order
        assert "items" in order
        assert "status" in order
        assert "created_at" in order
        assert "updated_at" in order


def test_get_order_by_id():
    """Test getting a specific order by ID"""
    # First get all orders to get an ID
    response = client.get("/api/orders")
    assert response.status_code == 200
    orders = response.json()
    
    if orders:
        order_id = orders[0]["id"]
        response = client.get(f"/api/orders/{order_id}")
        assert response.status_code == 200
        order = response.json()
        assert order["id"] == order_id


def test_get_order_not_found():
    """Test getting a non-existent order"""
    response = client.get("/api/orders/non-existent-id")
    assert response.status_code == 200
    assert response.json() == {"error": "Order not found"}


def test_update_order_status():
    """Test updating order status"""
    # Get an order first
    response = client.get("/api/orders")
    orders = response.json()
    
    if orders:
        order_id = orders[0]["id"]
        old_status = orders[0]["status"]
        
        # Update status
        new_status = "inProgress" if old_status != "inProgress" else "readyToPickup"
        response = client.put(f"/api/orders/{order_id}/status?status={new_status}")
        assert response.status_code == 200
        result = response.json()
        assert result["order"]["status"] == new_status
        
        # Verify the change persisted
        response = client.get(f"/api/orders/{order_id}")
        assert response.json()["status"] == new_status


def test_update_order_status_invalid():
    """Test updating order status with invalid status"""
    response = client.get("/api/orders")
    orders = response.json()
    
    if orders:
        order_id = orders[0]["id"]
        response = client.put(f"/api/orders/{order_id}/status?status=invalid_status")
        assert response.status_code == 200
        assert "error" in response.json()


def test_update_order_status_not_found():
    """Test updating status of non-existent order"""
    response = client.put("/api/orders/non-existent-id/status?status=inProgress")
    assert response.status_code == 200
    assert response.json() == {"error": "Order not found"}


def test_simulate_order_change():
    """Test simulating an order status change"""
    response = client.post("/api/orders/simulate-change")
    assert response.status_code == 200
    result = response.json()
    assert "message" in result
    assert "order_id" in result
    assert "old_status" in result
    assert "new_status" in result


def test_orders_grouped_by_status():
    """Test that orders can be grouped by status"""
    response = client.get("/api/orders")
    orders = response.json()
    
    # Group orders by status
    status_groups = {}
    for order in orders:
        status = order["status"]
        if status not in status_groups:
            status_groups[status] = []
        status_groups[status].append(order)
    
    # Verify we have orders with different statuses
    assert len(status_groups) > 0
    
    # Verify all statuses are valid
    valid_statuses = ["received", "inProgress", "readyToPickup"]
    for status in status_groups.keys():
        assert status in valid_statuses
