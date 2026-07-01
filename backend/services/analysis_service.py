from services.image_service import analyze_uploaded_image
from services.nlp_service import analyze_caption


def run_complete_analysis(image_path: str, caption: str):

    image_result = analyze_uploaded_image(image_path)
    sentiment_result = analyze_caption(caption)

    return {
        "filename": image_path.split("\\")[-1],

        "prediction": image_result["prediction"],
        "confidence": image_result["confidence"],

        "sentiment": sentiment_result["label"],
        "sentiment_score": sentiment_result["score"],
    }