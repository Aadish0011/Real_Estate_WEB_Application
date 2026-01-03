"""
Tests for authentication endpoints
"""
import pytest
from fastapi import status


def test_login_success(client, admin_user):
    """Test successful admin login"""
    response = client.post(
        "/api/admin/login",
        json={"username": "testadmin", "password": "testpassword"}
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_invalid_username(client):
    """Test login with invalid username"""
    response = client.post(
        "/api/admin/login",
        json={"username": "invalid", "password": "password"}
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_login_invalid_password(client, admin_user):
    """Test login with invalid password"""
    response = client.post(
        "/api/admin/login",
        json={"username": "testadmin", "password": "wrongpassword"}
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_get_current_admin(client, auth_token):
    """Test getting current admin info"""
    response = client.get(
        "/api/admin/me",
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["username"] == "testadmin"


def test_get_current_admin_no_token(client):
    """Test getting admin info without token"""
    response = client.get("/api/admin/me")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_get_current_admin_invalid_token(client):
    """Test getting admin info with invalid token"""
    response = client.get(
        "/api/admin/me",
        headers={"Authorization": "Bearer invalid-token"}
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

