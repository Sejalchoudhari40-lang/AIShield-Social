from transformers import pipeline

# Load HuggingFace Sentiment Model
sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)


def analyze_sentiment(text: str):

    result = sentiment_pipeline(text)[0]

    return {
        "label": result["label"],
        "score": round(result["score"] * 100, 2)
    }