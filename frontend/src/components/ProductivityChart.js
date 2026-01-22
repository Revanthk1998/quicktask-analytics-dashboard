import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ProductivityChart({ userId }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://127.0.0.1:8080/api/analytics/productivity?userId=${userId}`)
      .then((res) => {
        const labels = res.data.map((item) => item.date);
        const values = res.data.map((item) => item.completedTasks);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Tasks Completed Per Day",
              data: values,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.3,
            },
          ],
        });
      })
      .catch((err) => console.log("Chart API error:", err));
  }, [userId]);

  if (!chartData) return <p>Loading chart...</p>;

  return <Line data={chartData} />;
}

export default ProductivityChart;
