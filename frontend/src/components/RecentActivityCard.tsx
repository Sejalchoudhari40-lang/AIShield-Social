type ActivityProps = {
  filename: string;
  prediction: string;
  confidence: number;
  sentiment: string;
  sentiment_score: number;
  created_at: string;
};

function RecentActivityCard({
  filename,
  prediction,
  confidence,
  sentiment,
  sentiment_score,
  created_at,
}: ActivityProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:border-cyan-400 hover:shadow-xl">

      <div className="flex items-center justify-between">

        <h3 className="truncate text-lg font-bold text-white">
          {filename}
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            sentiment === "POSITIVE"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {sentiment}
        </span>

      </div>

      <div className="mt-5 space-y-2 text-sm">

        <p className="text-gray-300">
          <span className="font-semibold text-cyan-400">
            Prediction:
          </span>{" "}
          {prediction}
        </p>

        <p className="text-gray-300">
          <span className="font-semibold text-cyan-400">
            Confidence:
          </span>{" "}
          {confidence}%
        </p>

        <p className="text-gray-300">
          <span className="font-semibold text-cyan-400">
            Sentiment Score:
          </span>{" "}
          {sentiment_score}%
        </p>

      </div>

      <div className="mt-5 border-t border-white/10 pt-3">

        <p className="text-xs text-gray-500">
          {created_at}
        </p>

      </div>

    </div>
  );
}

export default RecentActivityCard;