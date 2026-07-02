from transformers import pipeline

_sentiment = None

def load_pipeline():
    global _sentiment

    if _sentiment is None:
        _sentiment = pipeline(
            "sentiment-analysis",
            model="distilbert-base-uncased-finetuned-sst-2-english"
        )

    return _sentiment


def analyze_sentiment(text: str):
    sentiment = load_pipeline()

    result = sentiment(text)[0]

    return {
        "label": result["label"],
        "score": round(result["score"] * 100, 2)
    }
