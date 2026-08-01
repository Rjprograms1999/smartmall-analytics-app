import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TrendChart = ({ user }) => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const fetchTrends = async () => {
      const res = await axios.get("http://localhost:5000/api/telcotrends", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTrends(res.data);
    };
    fetchTrends();
  }, []);

  const data = {
    labels: trends.map((trend) => new Date(trend.recordedAt).toLocaleDateString()),
    datasets: [
      {
        label: "Trend Score",
        data: trends.map((trend) => trend.trendScore),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Telco Trends</h2>
      <Line data={data} />
    </div>
  );
};

export default TrendChart;
