import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import RecentActivityCard from "../components/RecentActivityCard";
import DashboardCharts from "../components/DashboardCharts";

import {
  getDashboard,
  getRecentActivity,
} from "../services/api";

import {
  FaCloudUploadAlt,
  FaBrain,
  FaRobot,
} from "react-icons/fa";

function Home() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_uploads: 0,
    positive_sentiment: 0,
    safe_content: 0,
  });

  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboard();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    }

    async function loadRecentActivity() {
      try {
        const data = await getRecentActivity();
        setActivities(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadDashboard();
    loadRecentActivity();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">

      <Navbar />

      <div className="mx-auto max-w-7xl p-8">

        <h1 className="text-4xl font-bold text-white">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-gray-400">
          AI Powered Content Moderation Dashboard
        </p>

        {/* Dashboard Statistics */}

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Total Users"
            value={stats.total_users}
          />

          <StatCard
            title="Total Uploads"
            value={stats.total_uploads}
          />

          <StatCard
            title="Positive Sentiment"
            value={stats.positive_sentiment}
          />

          <StatCard
            title="Safe Content"
            value={stats.safe_content}
          />

        </div>

        {/* Feature Cards */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">

            <FaCloudUploadAlt className="text-5xl text-cyan-400" />

            <h2 className="mt-4 text-xl font-bold text-white">
              Upload Image
            </h2>

            <p className="mt-2 text-gray-400">
              Upload an image and let AI analyze it.
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">

            <FaBrain className="text-5xl text-purple-400" />

            <h2 className="mt-4 text-xl font-bold text-white">
              AI Analysis
            </h2>

            <p className="mt-2 text-gray-400">
              Detect sentiment, category and content safety.
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">

            <FaRobot className="text-5xl text-green-400" />

            <h2 className="mt-4 text-xl font-bold text-white">
              Recommendations
            </h2>

            <p className="mt-2 text-gray-400">
              Personalized AI powered recommendations.
            </p>

          </div>

        </div>
        <DashboardCharts />

        <h2 className="mt-12 text-2xl font-bold text-white">
          Recent AI Analysis
        </h2>
                <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {activities.length === 0 ? (

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 text-center">

              <h3 className="text-xl font-semibold text-white">
                No Recent Activity
              </h3>

              <p className="mt-2 text-gray-400">
                Upload an image to see AI analysis history.
              </p>

            </div>

          ) : (

            activities.map((item: any, index: number) => (

              <RecentActivityCard
                key={index}
                filename={item.filename}
                prediction={item.prediction}
                confidence={item.confidence}
                sentiment={item.sentiment}
                sentiment_score={item.sentiment_score}
                created_at={item.created_at}
              />

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default Home;