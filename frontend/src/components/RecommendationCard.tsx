function RecommendationCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">

      <h2 className="text-lg font-bold text-yellow-400">
        💡 AI Recommendation
      </h2>

      <ul className="mt-5 space-y-3 text-gray-300">

        <li>🚀 Learn Computer Vision</li>

        <li>🤖 Explore Deep Learning</li>

        <li>🐍 Practice Python</li>

        <li>📚 Study PyTorch</li>

        <li>🧠 Build More AI Projects</li>

      </ul>

    </div>
  );
}

export default RecommendationCard;