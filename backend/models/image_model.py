from torchvision import models, transforms
from PIL import Image
import torch

# Load pretrained ResNet18
weights = models.ResNet18_Weights.DEFAULT
model = models.resnet18(weights=weights)
model.eval()

transform = weights.transforms()


def analyze_image(image_path):
    image = Image.open(image_path).convert("RGB")

    input_tensor = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(input_tensor)

    probabilities = torch.nn.functional.softmax(outputs[0], dim=0)

    confidence, predicted_class = torch.max(probabilities, 0)

    categories = weights.meta["categories"]

    return {
        "prediction": categories[predicted_class.item()],
        "confidence": round(confidence.item() * 100, 2)
    }