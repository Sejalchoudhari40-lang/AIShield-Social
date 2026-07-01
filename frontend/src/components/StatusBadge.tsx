type StatusBadgeProps = {
  confidence: number;
};

function StatusBadge({ confidence }: StatusBadgeProps) {
  const isSafe = confidence >= 80;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">

      <h2 className="text-lg font-bold text-cyan-400">
        🛡️ Content Status
      </h2>

      <div className="mt-5">

        {isSafe ? (
          <span className="rounded-full bg-green-500 px-5 py-2 text-white font-semibold">
            ✅ SAFE CONTENT
          </span>
        ) : (
          <span className="rounded-full bg-red-500 px-5 py-2 text-white font-semibold">
            ⚠️ REVIEW REQUIRED
          </span>
        )}

      </div>

      <p className="mt-4 text-gray-300">
        AI Confidence : {confidence}%
      </p>

    </div>
  );
}

export default StatusBadge;