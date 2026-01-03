"""
Database models for Real Estate Admin Panel
"""
from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


class Admin(Base):
    """Admin user model"""
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_active = Column(Boolean, default=True)


class Property(Base):
    """Property model"""
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    address = Column(String, nullable=False)
    price = Column(Float, nullable=True)  # Nullable for "Price Upon Request"
    bedrooms = Column(Integer, nullable=True)
    bathrooms = Column(Integer, nullable=True)
    sqft = Column(Integer, nullable=True)
    type = Column(String, nullable=False)  # Apartment, House, Office, Showroom, etc.
    status = Column(String, default="For Sale")  # For Sale, For Rent, Sold, Hidden
    description = Column(Text, nullable=True)
    images = Column(JSON, default=list)  # Array of image URLs/paths
    features = Column(JSON, default=list)  # Array of feature strings
    year_built = Column(Integer, nullable=True)
    lot_size = Column(String, nullable=True)
    coordinates_lat = Column(Float, nullable=True)
    coordinates_lng = Column(Float, nullable=True)
    listing_date = Column(String, nullable=True)
    mls_number = Column(String, nullable=True)
    property_tax = Column(Float, nullable=True)
    hoa_fee = Column(Float, nullable=True)
    parking = Column(Integer, nullable=True)
    heating = Column(String, nullable=True)
    cooling = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class PropertyImage(Base):
    """Property images model (optional - can use JSON in Property model)"""
    __tablename__ = "property_images"

    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False)
    image_path = Column(String, nullable=False)
    image_url = Column(String, nullable=False)
    is_primary = Column(Boolean, default=False)
    order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    property = relationship("Property", backref="property_images")

