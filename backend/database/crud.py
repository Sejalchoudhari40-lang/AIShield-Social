from sqlalchemy.orm import Session
from database.analysis_model import Analysis


def save_analysis(
    db: Session,
    filename: str,
    caption: str,
    prediction: str,
    confidence: float,
    sentiment: str,
    sentiment_score: float,
):
    analysis = Analysis(
        filename=filename,
        caption=caption,
        prediction=prediction,
        confidence=confidence,
        sentiment=sentiment,
        sentiment_score=sentiment_score,
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return analysis


def get_all_analysis(db: Session):
    return db.query(Analysis).order_by(Analysis.id.desc()).all()