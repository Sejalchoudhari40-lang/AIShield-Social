from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from database.database import get_db
from database.crud import get_all_analysis

import csv
import io

router = APIRouter()


# ======================================
# Get Analysis History
# ======================================

@router.get("/history")
def history(
    db: Session = Depends(get_db),
):
    return get_all_analysis(db)


# ======================================
# Export History CSV
# ======================================

@router.get("/history/export")
def export_history(
    db: Session = Depends(get_db),
):

    history = get_all_analysis(db)

    output = io.StringIO()

    writer = csv.writer(output)

    writer.writerow([
        "ID",
        "Filename",
        "Prediction",
        "Sentiment",
        "Confidence",
        "Created At",
    ])

    for item in history:

        writer.writerow([
            item.id,
            item.filename,
            item.prediction,
            item.sentiment,
            item.confidence,
            item.created_at,
        ])

    output.seek(0)

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition":
            "attachment; filename=history.csv"
        },
    )