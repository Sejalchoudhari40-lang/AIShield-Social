from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from database.analysis_model import Analysis

router = APIRouter()


@router.get("/recent-activity")
def recent_activity(db: Session = Depends(get_db)):
    records = (
        db.query(Analysis)
        .order_by(Analysis.created_at.desc())
        .limit(6)
        .all()
    )

    data = []

    for item in records:
        data.append(
            {
                "filename": item.filename,
                "caption": item.caption,
                "prediction": item.prediction,
                "confidence": round(item.confidence, 2),
                "sentiment": item.sentiment,
                "sentiment_score": round(item.sentiment_score, 2),
                "created_at": item.created_at.strftime("%d %b %Y %H:%M"),
            }
        )

    return data