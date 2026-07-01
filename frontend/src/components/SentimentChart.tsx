import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

function SentimentChart() {
  const [data, setData] = useState([
    { name: "Positive", value: 0 },
    { name: "Negative", value: 0 },
  ]);

  useEffect(() => {
    async function loadChart() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/chart-data"
        );

        const json = await response.json();

        setData(json.sentiment);
      } catch (error) {
        console.error(error);
      }
    }

    loadChart();
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Sentiment Analysis
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >

            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default SentimentChart;