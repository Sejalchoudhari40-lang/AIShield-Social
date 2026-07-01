from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from datetime import datetime

from database.database import Base


class Analysis(Base):
    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String, nullable=False)

    caption = Column(Text, nullable=False)

    prediction = Column(String, nullable=False)

    confidence = Column(Float, nullable=False)

    sentiment = Column(String, nullable=False)

    sentiment_score = Column(Float, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)