from models.sentiment_model import analyze_sentiment


def analyze_caption(caption: str):
    return analyze_sentiment(caption)