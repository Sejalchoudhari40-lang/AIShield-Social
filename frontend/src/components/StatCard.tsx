type StatCardProps = {
  title: string;
  value: number;
};

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-lg">
      <h3 className="text-sm text-gray-400">{title}</h3>

      <p className="mt-3 text-4xl font-bold text-cyan-400">
        {value}
      </p>
    </div>
  );
}

export default StatCard;