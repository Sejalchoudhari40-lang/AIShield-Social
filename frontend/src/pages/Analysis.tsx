import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import ImagePreview from "../components/ImagePreview";
import AIResultCard from "../components/AIResultCard";
import ConfidenceBar from "../components/ConfidenceBar";
import StatusBadge from "../components/StatusBadge";
import RecommendationCard from "../components/RecommendationCard";
import NLPAnalysisCard from "../components/NLPAnalysisCard";

import aiPost from "../assets/ai-post.jpg";
import { analyzeImage, IMAGE_URL } from "../services/api";

function Analysis() {
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const data = await analyzeImage();

        setPrediction(data.prediction);
        setConfidence(data.confidence);
        setImageUrl(IMAGE_URL + data.filename);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalysis();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">

      <Navbar />

      <div className="mx-auto max-w-7xl p-10">

        <h1 className="text-4xl font-bold text-white">
          AI Analysis Dashboard
        </h1>

        <p className="mt-2 text-gray-400">
          Enterprise AI powered content moderation using Computer Vision & NLP.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          {/* Left Side */}

          <ImagePreview
            imageUrl={imageUrl || aiPost}
          />

          {/* Right Side */}

          <div className="space-y-6">
            <AIResultCard
              prediction={prediction}
              confidence={confidence}
              loading={loading}
            />

            <ConfidenceBar
              confidence={confidence}
            />

            <StatusBadge
              confidence={confidence}
            />

            {/* NLP Analysis */}

            <NLPAnalysisCard />
            
            <RecommendationCard />

          </div>

        </div>

      </div>
    
    </div>

    
  );
}

export default Analysis;