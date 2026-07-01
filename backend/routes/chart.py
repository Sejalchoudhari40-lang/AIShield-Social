from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from database.analysis_model import Analysis

router = APIRouter()


@router.get("/chart-data")
def chart_data(db: Session = Depends(get_db)):

    total = db.query(Analysis).count()

    positive = (
        db.query(Analysis)
        .filter(Analysis.sentiment == "POSITIVE")
        .count()
    )

    negative = (
        db.query(Analysis)
        .filter(Analysis.sentiment == "NEGATIVE")
        .count()
    )

    safe = (
        db.query(Analysis)
        .filter(Analysis.confidence >= 50)
        .count()
    )

    unsafe = total - safe

    return {
        "sentiment": [
            {
                "name": "Positive",
                "value": positive,
            },
            {
                "name": "Negative",
                "value": negative,
            },
        ],
        "safety": [
            {
                "name": "Safe",
                "value": safe,
            },
            {
                "name": "Unsafe",
                "value": unsafe,
            },
        ],
    }