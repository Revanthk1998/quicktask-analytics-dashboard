import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductivityChart from "./ProductivityChart";
import StatusChart from "./StatusChart";
import API from "../api/axios";

function AnalyticsTab() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    completionRate: 0,
  });

  const loadTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const loadStats = async (userId) => {
    const res = await axios.get(
      `http://127.0.0.1:8080/api/analytics/user-stats?userId=${userId}`
    );
    setStats(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      loadStats(tasks[0].user);
    }
  }, [tasks]);

  const userId = tasks.length > 0 ? tasks[0].user : null;

  return (
    <div className="space-y-6">

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Total Tasks</p>
          <p className="text-2xl font-bold text-blue-700">{stats.totalTasks}</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl font-bold text-green-700">{stats.completedTasks}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.pendingTasks}</p>
        </div>

        <div className="bg-purple-100 p-4 rounded shadow">
          <p className="text-sm text-gray-600">Completion Rate</p>
          <p className="text-2xl font-bold text-purple-700">{stats.completionRate}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Productivity (Tasks per Day)</h3>
          {userId && <ProductivityChart userId={userId} />}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Task Status Distribution</h3>
          <StatusChart tasks={tasks} />
        </div>
      </div>

    </div>
  );
}

export default AnalyticsTab;
