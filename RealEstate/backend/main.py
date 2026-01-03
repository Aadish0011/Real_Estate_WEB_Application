"""
FastAPI main application for Real Estate Admin Panel
"""
from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List, Optional, cast
import json

from database import get_db, init_db
from models import Admin, Property
from schemas import (
    Token, AdminLogin, PropertyCreate, PropertyUpdate, 
    PropertyResponse, PropertyListResponse
)
from auth import (
    authenticate_admin, create_access_token, get_current_admin,
    get_password_hash, ACCESS_TOKEN_EXPIRE_MINUTES
)
from datetime import timedelta
from utils import save_uploaded_image, delete_image_file
import os

app = FastAPI(
    title="Real Estate Admin API",
    description="Backend API for Real Estate Admin Panel",
    version="1.0.0"
)

# CORS middleware - Production ready
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Mount static files for uploaded images
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)  # Create directory if it doesn't exist
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    init_db()
    # Create default admin if doesn't exist
    db = next(get_db())
    admin = db.query(Admin).filter(Admin.username == "admin").first()
    if not admin:
        default_password = os.getenv("ADMIN_PASSWORD", "admin123")
        # Ensure password is not too long for bcrypt (72 bytes max)
        if len(default_password.encode('utf-8')) > 72:
            default_password = default_password[:72]
            print("Warning: Admin password was truncated to 72 bytes for bcrypt compatibility")
        hashed_password = get_password_hash(default_password)
        new_admin = Admin(
            username="admin",
            hashed_password=hashed_password,
            is_active=True
        )
        db.add(new_admin)
        db.commit()
        print(f"Default admin created: username='admin', password='{default_password}'")
    db.close()


# Health check
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Real Estate API is running"}


# Authentication endpoints
@app.post("/api/admin/login", response_model=Token)
async def login(credentials: AdminLogin, db: Session = Depends(get_db)):
    """Admin login endpoint"""
    admin = authenticate_admin(db, credentials.username, credentials.password)
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": admin.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/api/admin/me")
async def get_current_admin_info(current_admin: Admin = Depends(get_current_admin)):
    """Get current admin information"""
    return {
        "id": current_admin.id,
        "username": current_admin.username,
        "is_active": current_admin.is_active
    }


# Public property endpoints
@app.get("/api/properties", response_model=PropertyListResponse)
async def get_properties(
    skip: int = 0,
    limit: int = 100,
    type: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all properties (public endpoint)"""
    query = db.query(Property)
    
    # Filter by status (exclude hidden)
    query = query.filter(Property.status != "Hidden")
    
    if type:
        query = query.filter(Property.type == type)
    if status:
        query = query.filter(Property.status == status)
    
    total = query.count()
    properties = query.offset(skip).limit(limit).all()
    
    return {
        "properties": properties,
        "total": total
    }


@app.get("/api/properties/{property_id}", response_model=PropertyResponse)
async def get_property(property_id: int, db: Session = Depends(get_db)):
    """Get single property by ID (public endpoint)"""
    try:
        property = db.query(Property).filter(Property.id == property_id).first()
        if not property:
            raise HTTPException(status_code=404, detail="Property not found")
        if str(property.status) == "Hidden":
            raise HTTPException(status_code=404, detail="Property not found")
        return property
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting property: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


# Admin property endpoints (protected)
@app.post("/api/admin/properties", response_model=PropertyResponse, status_code=status.HTTP_201_CREATED)
async def create_property(
    title: str = Form(...),
    address: str = Form(...),
    price: Optional[float] = Form(None),
    bedrooms: Optional[int] = Form(None),
    bathrooms: Optional[int] = Form(None),
    sqft: Optional[int] = Form(None),
    type: str = Form(...),
    status: str = Form("For Sale"),
    description: Optional[str] = Form(None),
    features: str = Form("[]"),  # JSON string
    year_built: Optional[int] = Form(None),
    lot_size: Optional[str] = Form(None),
    coordinates_lat: Optional[float] = Form(None),
    coordinates_lng: Optional[float] = Form(None),
    listing_date: Optional[str] = Form(None),
    mls_number: Optional[str] = Form(None),
    property_tax: Optional[float] = Form(None),
    hoa_fee: Optional[float] = Form(None),
    parking: Optional[int] = Form(None),
    heating: Optional[str] = Form(None),
    cooling: Optional[str] = Form(None),
    images: List[UploadFile] = File([]),
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Create new property"""
    try:
        features_list = json.loads(features) if features else []
    except json.JSONDecodeError:
        features_list = []
    
    # Create property first (to get ID for image naming)
    new_property = Property(
        title=title,
        address=address,
        price=price,
        bedrooms=bedrooms,
        bathrooms=bathrooms,
        sqft=sqft,
        type=type,
        status=status,
        description=description,
        features=features_list,
        year_built=year_built,
        lot_size=lot_size,
        coordinates_lat=coordinates_lat,
        coordinates_lng=coordinates_lng,
        listing_date=listing_date,
        mls_number=mls_number,
        property_tax=property_tax,
        hoa_fee=hoa_fee,
        parking=parking,
        heating=heating,
        cooling=cooling,
        images=[]
    )
    
    db.add(new_property)
    db.commit()
    db.refresh(new_property)
    
    # Upload images with error handling
    image_paths = []
    property_id = cast(int, new_property.id)  # Cast to int for type checker
    for image_file in images:
        try:
            image_path = await save_uploaded_image(image_file, property_id)
            image_paths.append(image_path)
        except HTTPException:
            raise  # Re-raise HTTP exceptions
        except Exception as e:
            print(f"Error uploading image: {e}")
            # Continue with other images, don't fail entire request
            continue
    
    # Update property with image paths
    # Cast JSON column to list for type checker
    try:
        current_images = cast(List[str], new_property.images) if new_property.images is not None else []
        new_property.images = current_images + image_paths  # type: ignore
        db.commit()
        db.refresh(new_property)
        return new_property
    except Exception as e:
        db.rollback()
        print(f"Error updating property with images: {e}")
        raise HTTPException(status_code=500, detail="Failed to save property images")


@app.get("/api/admin/properties", response_model=PropertyListResponse)
async def get_all_properties_admin(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """Get all properties (admin endpoint - includes hidden)"""
    query = db.query(Property)
    total = query.count()
    properties = query.offset(skip).limit(limit).all()
    
    return {
        "properties": properties,
        "total": total
    }


@app.get("/api/admin/properties/{property_id}", response_model=PropertyResponse)
async def get_property_admin(
    property_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """Get single property by ID (admin endpoint)"""
    property = db.query(Property).filter(Property.id == property_id).first()
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    return property


@app.put("/api/admin/properties/{property_id}", response_model=PropertyResponse)
async def update_property(
    property_id: int,
    property_update: PropertyUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """Update existing property"""
    property = db.query(Property).filter(Property.id == property_id).first()
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    
    # Update fields
    update_data = property_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(property, field, value)
    
    db.commit()
    db.refresh(property)
    return property


@app.delete("/api/admin/properties/{property_id}")
async def delete_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """Delete property"""
    property = db.query(Property).filter(Property.id == property_id).first()
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    
    # Delete associated images
    images_list = cast(List[str], property.images) if property.images is not None else []
    for image_path in images_list:
        await delete_image_file(image_path)
    
    db.delete(property)
    db.commit()
    return {"message": "Property deleted successfully"}


@app.post("/api/admin/properties/{property_id}/images")
async def upload_property_images(
    property_id: int,
    images: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """Upload additional images for a property"""
    property = db.query(Property).filter(Property.id == property_id).first()
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    
    image_paths = []
    for image_file in images:
        try:
            image_path = await save_uploaded_image(image_file, property_id)
            image_paths.append(image_path)
        except Exception as e:
            print(f"Error uploading image: {e}")
            continue
    
    # Add new images to existing ones
    current_images = cast(List[str], property.images) if property.images is not None else []
    property.images = current_images + image_paths  # type: ignore
    db.commit()
    db.refresh(property)
    
    images_result = cast(List[str], property.images) if property.images is not None else []
    return {"message": f"{len(image_paths)} images uploaded successfully", "images": images_result}


@app.delete("/api/admin/properties/{property_id}/images/{image_index}")
async def delete_property_image(
    property_id: int,
    image_index: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """Delete a specific image from a property"""
    property = db.query(Property).filter(Property.id == property_id).first()
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    
    # Cast JSON column to list for type checker
    images_list = cast(List[str], property.images) if property.images is not None else []
    
    if image_index < 0 or image_index >= len(images_list):
        raise HTTPException(status_code=400, detail="Invalid image index")
    
    # Delete file from filesystem
    image_path = images_list[image_index]
    await delete_image_file(image_path)
    
    # Remove from property images
    images_list.pop(image_index)
    property.images = images_list  # type: ignore
    db.commit()
    
    return {"message": "Image deleted successfully", "images": images_list}

