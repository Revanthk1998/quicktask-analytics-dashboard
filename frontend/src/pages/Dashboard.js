import React, { useState } from "react";
import AnalyticsTab from "../components/AnalyticsTab";
import TasksTab from "../components/TasksTab";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">QuickTask Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("analytics")}
          className={`px-4 py-2 rounded ${
            activeTab === "analytics"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          Analytics
        </button>

        <button
          onClick={() => setActiveTab("tasks")}
          className={`px-4 py-2 rounded ${
            activeTab === "tasks"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          Tasks
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-4 rounded shadow">
        {activeTab === "analytics" && <AnalyticsTab />}
        {activeTab === "tasks" && <TasksTab />}
      </div>
    </div>
  );
}

export default Dashboard;
