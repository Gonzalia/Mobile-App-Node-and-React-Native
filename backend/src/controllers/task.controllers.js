import Task from "../models/task.model.js";
export const getTasks = async (req, res) => {
  const { id } = req.body
  try {
    const tasks = await Task.find()
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Server error" })
  }

};
export const getTaskByID = async (req, res) => {
  try {
    const taskByID = await Task.findById(req.params.id);
    if (!taskByID) return res.status(404).json({ message: "Task not found" });
    res.json(taskByID);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" })
  }

};
export const createTask = async (req, res) => {
  try {
    const { title, description, date, id } = req.body;

    console.log(req);

    const newTask = new Task({
      title,
      description,
      date,
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskByID = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // This returns the UPDATED task, by default, mongo returns the previous task
    });
    if (!taskByID) return res.status(404).json({ message: "Task not found" });
    res.json(taskByID);
  } catch {
    return res.status(500).json({ message: error.message });

  }

};
