"""
Pydantic schemas for request/response validation
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


# Authentication Schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class AdminLogin(BaseModel):
    username: str
    password: str


# Property Schemas
class PropertyBase(BaseModel):
    title: str
    address: str
    price: Optional[float] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    sqft: Optional[int] = None
    type: str
    status: str = "For Sale"
    description: Optional[str] = None
    features: List[str] = []
    year_built: Optional[int] = None
    lot_size: Optional[str] = None
    coordinates_lat: Optional[float] = None
    coordinates_lng: Optional[float] = None
    listing_date: Optional[str] = None
    mls_number: Optional[str] = None
    property_tax: Optional[float] = None
    hoa_fee: Optional[float] = None
    parking: Optional[int] = None
    heating: Optional[str] = None
    cooling: Optional[str] = None


class PropertyCreate(PropertyBase):
    images: List[str] = []


class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    address: Optional[str] = None
    price: Optional[float] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    sqft: Optional[int] = None
    type: Optional[str] = None
    status: Optional[str] = None
    description: Optional[str] = None
    images: Optional[List[str]] = None
    features: Optional[List[str]] = None
    year_built: Optional[int] = None
    lot_size: Optional[str] = None
    coordinates_lat: Optional[float] = None
    coordinates_lng: Optional[float] = None
    listing_date: Optional[str] = None
    mls_number: Optional[str] = None
    property_tax: Optional[float] = None
    hoa_fee: Optional[float] = None
    parking: Optional[int] = None
    heating: Optional[str] = None
    cooling: Optional[str] = None


class PropertyResponse(PropertyBase):
    id: int
    images: List[str] = []
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class PropertyListResponse(BaseModel):
    properties: List[PropertyResponse]
    total: int

