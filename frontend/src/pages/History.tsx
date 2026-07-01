import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getHistory,
  exportHistoryCSV,
} from "../services/api";

type HistoryItem = {
  id: number;
  filename: string;
  prediction: string;
  sentiment: string;
  confidence: number;
  created_at: string;
};

function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function fetchHistory() {
      try {
        const data = await getHistory();
        setHistory(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  async function handleExport() {
    try {
      const blob = await exportHistoryCSV();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "history.csv";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Export Failed");
    }
  }

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchSearch = item.filename
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchFilter =
        filter === "All"
          ? true
          : item.sentiment.toLowerCase() ===
            filter.toLowerCase();

      return matchSearch && matchFilter;
    });
  }, [history, search, filter]);

  return (
    <div className="min-h-screen bg-slate-950">

      <Navbar />

      <div className="mx-auto max-w-7xl p-10">

        <h1 className="text-4xl font-bold text-white">
          Analysis History
        </h1>

        <p className="mt-2 text-gray-400">
          View all previous AI analysis records.
        </p>

        <div className="mt-8 flex flex-col gap-4 md:flex-row">

          <input
            type="text"
            placeholder="Search image..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-slate-900 px-5 py-3 text-white outline-none"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-slate-900 px-5 py-3 text-white"
          >
            <option>All</option>
            <option>Positive</option>
            <option>Negative</option>
          </select>

          <button
            onClick={handleExport}
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white hover:bg-cyan-600"
          >
            Export CSV
          </button>

        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
                  {loading ? (

            <div className="p-10 text-center text-white">
              Loading History...
            </div>

          ) : filteredHistory.length === 0 ? (

            <div className="p-10 text-center text-gray-400">
              No analysis records found.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-slate-800">

                  <tr>

                    <th className="p-5 text-left text-cyan-400">
                      Image
                    </th>

                    <th className="p-5 text-left text-cyan-400">
                      Prediction
                    </th>

                    <th className="p-5 text-left text-cyan-400">
                      Sentiment
                    </th>

                    <th className="p-5 text-left text-cyan-400">
                      Confidence
                    </th>

                    <th className="p-5 text-left text-cyan-400">
                      Date
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredHistory.map((item) => (

                    <tr
                      key={item.id}
                      className="border-t border-white/10 hover:bg-slate-800 transition"
                    >

                      <td className="p-5 text-white">
                        {item.filename}
                      </td>

                      <td className="p-5 text-green-400 font-medium">
                        {item.prediction}
                      </td>

                      <td className="p-5">

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            item.sentiment.toLowerCase() === "positive"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {item.sentiment}
                        </span>

                      </td>

                      <td className="p-5 text-yellow-400">
                        {Number(item.confidence).toFixed(2)}%
                      </td>

                      <td className="p-5 text-gray-400">
                        {new Date(item.created_at).toLocaleString()}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default History;
