from fastapi import APIRouter, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session
from database.database import get_db
from database.crud import save_analysis

from services.image_service import analyze_uploaded_image
from services.nlp_service import analyze_caption

import shutil
import os

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/analyze-complete")
async def analyze_complete(
    file: UploadFile = File(...),
    caption: str = Form(...),
    db: Session = Depends(get_db),
):

    # Save Image
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # AI Image Analysis
    image_result = analyze_uploaded_image(file_path)

    # NLP Analysis
    sentiment_result = analyze_caption(caption)

    # Save Database
    save_analysis(
        db=db,
        filename=file.filename,
        caption=caption,
        prediction=image_result["prediction"],
        confidence=image_result["confidence"],
        sentiment=sentiment_result["label"],
        sentiment_score=sentiment_result["score"],
    )

    return {
        "filename": file.filename,
        "prediction": image_result["prediction"],
        "confidence": image_result["confidence"],
        "sentiment": sentiment_result["label"],
        "sentiment_score": sentiment_result["score"],
        "message": "Analysis Saved Successfully ✅",
    }