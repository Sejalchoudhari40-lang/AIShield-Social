function NLPAnalysisCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">

      <h2 className="text-lg font-bold text-purple-400">
        🧠 NLP Analysis
      </h2>

      <div className="mt-5 space-y-3">

        <p className="text-gray-300">
          😊 Sentiment :
          <span className="ml-2 font-semibold text-green-400">
            Positive
          </span>
        </p>

        <p className="text-gray-300">
          📂 Category :
          <span className="ml-2 font-semibold text-cyan-400">
            Technology
          </span>
        </p>

        <p className="text-gray-300">
          🏷 Hashtags :
          <span className="ml-2 text-yellow-400">
            #AI #MachineLearning
          </span>
        </p>

      </div>

    </div>
  );
}

export default NLPAnalysisCard;