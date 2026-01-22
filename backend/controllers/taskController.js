const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user });
  res.status(201).json(task);
};

// GET TASKS WITH FILTER, SEARCH, SORT
exports.getTasks = async (req, res) => {
  try {
    const { status, priority, search, sortBy } = req.query;

    let query = { user: req.user };

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by priority
    if (priority) {
      query.priority = priority;
    }

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Sorting
    let sortOptions = {};

    if (sortBy === "createdAt") {
      sortOptions.createdAt = -1; // latest first
    }

    if (sortBy === "dueDate") {
      sortOptions.dueDate = 1; // earliest first
    }

    if (sortBy === "priority") {
      sortOptions.priority = 1;
    }

    const tasks = await Task.find(query).sort(sortOptions);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
