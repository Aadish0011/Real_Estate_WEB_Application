"""
Pytest configuration and fixtures
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
import os
import tempfile
import shutil

from database import Base, get_db
from models import Admin, Property
from main import app
from auth import get_password_hash

# Use in-memory SQLite for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db():
    """Create a fresh database for each test"""
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db):
    """Create a test client with database override"""
    def override_get_db():
        try:
            yield db
        finally:
            pass
    
    app.dependency_overrides[get_db] = override_get_db
    
    # Create test upload directory
    test_upload_dir = tempfile.mkdtemp()
    os.environ["UPLOAD_DIR"] = test_upload_dir
    
    with TestClient(app) as test_client:
        yield test_client
    
    # Cleanup
    app.dependency_overrides.clear()
    shutil.rmtree(test_upload_dir, ignore_errors=True)


@pytest.fixture(scope="function")
def admin_user(db):
    """Create a test admin user"""
    admin = Admin(
        username="testadmin",
        hashed_password=get_password_hash("testpassword"),
        is_active=True
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin


@pytest.fixture(scope="function")
def auth_token(client, admin_user):
    """Get authentication token for test admin"""
    response = client.post(
        "/api/admin/login",
        json={"username": "testadmin", "password": "testpassword"}
    )
    return response.json()["access_token"]


@pytest.fixture(scope="function")
def test_property(db, admin_user):
    """Create a test property"""
    property = Property(
        title="Test Property",
        address="123 Test St",
        price=100000,
        bedrooms=3,
        bathrooms=2,
        sqft=1500,
        type="House",
        status="For Sale",
        description="Test description",
        images=[],
        features=["Feature 1", "Feature 2"]
    )
    db.add(property)
    db.commit()
    db.refresh(property)
    return property

