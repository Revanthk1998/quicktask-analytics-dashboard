import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function StatusChart({ tasks }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!tasks || tasks.length === 0) return;

    const statusCount = {
      Todo: 0,
      InProgress: 0,
      Completed: 0,
    };

    tasks.forEach((task) => {
      if (task.status === "Todo") statusCount.Todo++;
      if (task.status === "In Progress") statusCount.InProgress++;
      if (task.status === "Completed") statusCount.Completed++;
    });

    setChartData({
      labels: ["Todo", "In Progress", "Completed"],
      datasets: [
        {
          label: "Tasks by Status",
          data: [
            statusCount.Todo,
            statusCount.InProgress,
            statusCount.Completed,
          ],
          backgroundColor: ["#facc15", "#38bdf8", "#22c55e"],
        },
      ],
    });
  }, [tasks]);

  if (!chartData) return <p>Loading status chart...</p>;

  return <Bar data={chartData} />;
}

export default StatusChart;
