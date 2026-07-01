from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from services.image_service import analyze_uploaded_image
from database.database import get_db
from database.crud import save_analysis
import os

router = APIRouter()

UPLOAD_FOLDER = "uploads"


@router.get("/analyze")
def analyze(db: Session = Depends(get_db)):

    files = os.listdir(UPLOAD_FOLDER)

    if not files:
        return {"error": "No image uploaded"}

    latest_image = os.path.join(UPLOAD_FOLDER, files[-1])

    result = analyze_uploaded_image(latest_image)

    result["filename"] = os.path.basename(latest_image)

    return result