type AIResultCardProps = {
  prediction: string;
  confidence: number;
  loading: boolean;
};

function AIResultCard({
  prediction,
  confidence,
  loading,
}: AIResultCardProps) {
  return (
    <div className="rounded-2xl bg-slate-900 p-6 border border-white/10">

      <h2 className="text-lg font-bold text-cyan-400">
        🤖 AI Prediction
      </h2>

      {loading ? (
        <p className="mt-4 text-yellow-400 animate-pulse">
          🔄 AI is analyzing...
        </p>
      ) : (
        <>
          <p className="mt-4 text-green-400 text-lg font-semibold">
            {prediction}
          </p>

          <p className="mt-2 text-gray-300">
            Confidence : {confidence}%
          </p>
        </>
      )}

    </div>
  );
}

export default AIResultCard;