import React, { useEffect, useState } from "react";
import API from "../api/axios";

function TasksTab() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "Low",
    status: "Todo",
  });

  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState({
    title: "",
    priority: "Low",
    status: "Todo",
  });

  const loadTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await API.post("/tasks", newTask);
    setNewTask({ title: "", priority: "Low", status: "Todo" });
    loadTasks();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await API.delete(`/tasks/${id}`);
      loadTasks();
    }
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setEditTask({
      title: task.title,
      priority: task.priority,
      status: task.status,
    });
  };

  const handleUpdate = async (id) => {
    await API.put(`/tasks/${id}`, editTask);
    setEditId(null);
    loadTasks();
  };

  const badgeColor = (status) => {
    if (status === "Todo") return "bg-yellow-100 text-yellow-800";
    if (status === "In Progress") return "bg-blue-100 text-blue-800";
    if (status === "Completed") return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">

      {/* Create Task */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Create Task</h3>
        <form onSubmit={handleCreate} className="flex gap-2">
          <input
            className="border p-2 rounded w-1/3"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
            required
          />
          <select
            className="border p-2 rounded"
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <select
            className="border p-2 rounded"
            value={newTask.status}
            onChange={(e) =>
              setNewTask({ ...newTask, status: e.target.value })
            }
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <button className="bg-blue-600 text-white px-4 rounded">
            Add
          </button>
        </form>
      </div>

      {/* Task Table */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Tasks</h3>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2">Title</th>
              <th className="p-2">Priority</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-b">
                {editId === task._id ? (
                  <>
                    <td className="p-2">
                      <input
                        className="border p-1 rounded w-full"
                        value={editTask.title}
                        onChange={(e) =>
                          setEditTask({ ...editTask, title: e.target.value })
                        }
                      />
                    </td>
                    <td className="p-2">
                      <select
                        className="border p-1 rounded"
                        value={editTask.priority}
                        onChange={(e) =>
                          setEditTask({
                            ...editTask,
                            priority: e.target.value,
                          })
                        }
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <select
                        className="border p-1 rounded"
                        value={editTask.status}
                        onChange={(e) =>
                          setEditTask({
                            ...editTask,
                            status: e.target.value,
                          })
                        }
                      >
                        <option>Todo</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleUpdate(task._id)}
                        className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-400 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2">{task.title}</td>
                    <td className="p-2">{task.priority}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${badgeColor(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleEdit(task)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default TasksTab;
