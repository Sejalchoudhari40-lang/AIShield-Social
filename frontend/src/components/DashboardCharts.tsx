import SentimentChart from "./SentimentChart";
import SafetyChart from "./SafetyChart";

function DashboardCharts() {
  return (
    <div className="mt-12">

      <h2 className="mb-6 text-2xl font-bold text-white">
        AI Analytics Dashboard
      </h2>

      <div className="grid gap-8 lg:grid-cols-2">

        <SentimentChart />

        <SafetyChart />

      </div>

    </div>
  );
}

export default DashboardCharts;