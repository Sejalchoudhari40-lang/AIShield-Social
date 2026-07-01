from fastapi import APIRouter
from pydantic import BaseModel

from services.nlp_service import analyze_caption

router = APIRouter()


class CaptionRequest(BaseModel):
    caption: str


@router.post("/analyze-text")
def analyze_text(data: CaptionRequest):
    return analyze_caption(data.caption)