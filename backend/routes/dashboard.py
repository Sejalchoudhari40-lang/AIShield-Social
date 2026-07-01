from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from database.database import get_db
from database.analysis_model import Analysis
from database.user_model import User

router = APIRouter()


@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):

    total_users = db.query(User).count()

    total_uploads = db.query(Analysis).count()

    positive = (
        db.query(Analysis)
        .filter(Analysis.sentiment == "POSITIVE")
        .count()
    )

    safe = (
        db.query(Analysis)
        .filter(Analysis.confidence >= 50)
        .count()
    )

    return {
        "total_users": total_users,
        "total_uploads": total_uploads,
        "positive_sentiment": positive,
        "safe_content": safe,
    }