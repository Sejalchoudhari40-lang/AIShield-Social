type ConfidenceBarProps = {
  confidence: number;
};

function ConfidenceBar({ confidence }: ConfidenceBarProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">

      <h2 className="text-lg font-bold text-cyan-400">
        📊 AI Confidence
      </h2>

      <div className="mt-5 h-4 w-full overflow-hidden rounded-full bg-slate-700">

        <div
          className="h-full rounded-full bg-cyan-500 transition-all duration-700"
          style={{
            width: `${confidence}%`,
          }}
        />

      </div>

      <p className="mt-3 text-center text-white font-semibold">
        {confidence}%
      </p>

    </div>
  );
}

export default ConfidenceBar;