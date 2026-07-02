from torchvision import models
from PIL import Image
import torch

_model = None
_transform = None
_categories = None

def load_model():
    global _model, _transform, _categories

    if _model is None:
        weights = models.ResNet18_Weights.DEFAULT
        _model = models.resnet18(weights=weights)
        _model.eval()
        _transform = weights.transforms()
        _categories = weights.meta["categories"]

    return _model, _transform, _categories


def analyze_image(image_path):
    model, transform, categories = load_model()

    image = Image.open(image_path).convert("RGB")
    input_tensor = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(input_tensor)

    probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
    confidence, predicted_class = torch.max(probabilities, 0)

    return {
        "prediction": categories[predicted_class.item()],
        "confidence": round(confidence.item() * 100, 2)
    }
