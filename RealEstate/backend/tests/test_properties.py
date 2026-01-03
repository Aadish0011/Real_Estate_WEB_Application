"""
Tests for property endpoints
"""
import pytest
from fastapi import status


def test_get_properties_public(client, test_property):
    """Test getting properties (public endpoint)"""
    response = client.get("/api/properties")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "properties" in data
    assert "total" in data
    assert len(data["properties"]) > 0


def test_get_property_by_id(client, test_property):
    """Test getting a single property by ID"""
    response = client.get(f"/api/properties/{test_property.id}")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["id"] == test_property.id
    assert data["title"] == "Test Property"


def test_get_property_not_found(client):
    """Test getting non-existent property"""
    response = client.get("/api/properties/99999")
    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_get_properties_admin(client, auth_token, test_property):
    """Test getting properties (admin endpoint)"""
    response = client.get(
        "/api/admin/properties",
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "properties" in data
    assert "total" in data


def test_create_property(client, auth_token):
    """Test creating a new property"""
    property_data = {
        "title": "New Property",
        "address": "456 New St",
        "price": 200000,
        "bedrooms": 4,
        "bathrooms": 3,
        "sqft": 2000,
        "type": "House",
        "status": "For Sale",
        "description": "New property description"
    }
    response = client.post(
        "/api/admin/properties",
        json=property_data,
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["title"] == "New Property"


def test_update_property(client, auth_token, test_property):
    """Test updating a property"""
    update_data = {
        "title": "Updated Property",
        "price": 150000
    }
    response = client.put(
        f"/api/admin/properties/{test_property.id}",
        json=update_data,
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["title"] == "Updated Property"
    assert data["price"] == 150000


def test_delete_property(client, auth_token, test_property):
    """Test deleting a property"""
    property_id = test_property.id
    response = client.delete(
        f"/api/admin/properties/{property_id}",
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == status.HTTP_200_OK
    
    # Verify property is deleted
    get_response = client.get(f"/api/properties/{property_id}")
    assert get_response.status_code == status.HTTP_404_NOT_FOUND


def test_create_property_unauthorized(client):
    """Test creating property without authentication"""
    response = client.post(
        "/api/admin/properties",
        data={"title": "Test", "address": "Test", "type": "House"}
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_create_property_invalid_data(client, auth_token):
    """Test creating property with invalid data"""
    # Missing required fields
    response = client.post(
        "/api/admin/properties",
        data={"title": ""},
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST


def test_create_property_negative_price(client, auth_token):
    """Test creating property with negative price"""
    property_data = {
        "title": "Test Property",
        "address": "Test Address",
        "price": -1000,
        "type": "House",
        "status": "For Sale"
    }
    response = client.post(
        "/api/admin/properties",
        data=property_data,
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST

