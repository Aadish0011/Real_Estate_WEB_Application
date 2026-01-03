"""
Utility functions for file handling and validation
"""
import os
import io
import aiofiles
from fastapi import UploadFile, HTTPException
from PIL import Image
import secrets
from typing import List
from dotenv import load_dotenv

load_dotenv()

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", "10485760"))  # 10MB
ALLOWED_EXTENSIONS = os.getenv("ALLOWED_EXTENSIONS", "jpg,jpeg,png,webp").split(",")

# Create upload directory if it doesn't exist
os.makedirs(UPLOAD_DIR, exist_ok=True)


def validate_image_file(file: UploadFile) -> bool:
    """Validate uploaded image file"""
    if not file.content_type or not file.content_type.startswith("image/"):
        return False
    
    extension = file.filename.split(".")[-1].lower() if file.filename else ""
    return extension in ALLOWED_EXTENSIONS


async def save_uploaded_image(file: UploadFile, property_id: int) -> str:
    """
    Save uploaded image and return the file path
    Returns: relative path from uploads directory
    """
    if not validate_image_file(file):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    # Generate unique filename
    extension = file.filename.split(".")[-1].lower()
    random_string = secrets.token_urlsafe(8)
    filename = f"property_{property_id}_{random_string}.{extension}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    # Read and validate file size
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File size exceeds maximum allowed size ({MAX_FILE_SIZE / 1024 / 1024}MB)"
        )
    
    # Validate and optimize image
    try:
        image = Image.open(io.BytesIO(content))
        # Convert to RGB if necessary (handles RGBA, P, etc.)
        if image.mode in ("RGBA", "P"):
            image = image.convert("RGB")
        
        # Resize if too large (max 2000px on longest side)
        max_size = 2000
        if max(image.size) > max_size:
            image.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
        
        # Save optimized image
        image.save(file_path, "JPEG", quality=85, optimize=True)
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid image file: {str(e)}"
        )
    
    return f"/{UPLOAD_DIR}/{filename}"


async def delete_image_file(image_path: str):
    """Delete image file from filesystem"""
    if image_path.startswith("/"):
        image_path = image_path[1:]
    
    file_path = os.path.join(".", image_path)
    if os.path.exists(file_path):
        try:
            os.remove(file_path)
        except Exception as e:
            print(f"Error deleting file {file_path}: {e}")



