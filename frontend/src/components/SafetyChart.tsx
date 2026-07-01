import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function SafetyChart() {
  const [data, setData] = useState([
    { name: "Safe", value: 0 },
    { name: "Unsafe", value: 0 },
  ]);

  useEffect(() => {
    async function loadChart() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/chart-data"
        );

        const json = await response.json();

        setData(json.safety);
      } catch (error) {
        console.error(error);
      }
    }

    loadChart();
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Content Safety
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#06b6d4"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default SafetyChart;