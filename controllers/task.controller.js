const Task = require('../models/task.model');
const ApiError = require('../utils/ApiError');

exports.addTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  const task = await Task.create({
    title,
    description,
    dueDate,
    status,
    userId: req.user.id
  });
  res.status(201).json({status: true, data:task});
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  res.status(200).json({status: true, data: tasks});
};


exports.getTaskById = async (req, res) => {
  const { id } = req.params;

  console.log("id>>", id);
  

  try {
    const task = await Task.findOne({
      where: {
        id,
        userId: req.user.id 
      }
    });

    if (!task) {
      return res.status(404).json({ status: false, error: 'Task not found' });
    }

   res.status(200).json({status: true, data: task});
  } catch (error) {
    res.status(500).json({status: false, error: 'Failed to retrieve task' });
  }
};


exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const {status } = req.body;
  const task = await Task.findOne({ where: { id, userId: req.user.id } });
  if (!task) return res.status(404).json({ status: false, error: 'Task not found' });

  task.status = status ?? task.status;
  await task.save();
  res.status(201).json({status: true, data: task});
};


exports.deleteById = async (req, res) => {
  const { id } = req.params;

  console.log("id>>", id);
  

  try {
   const task = await Task.destroy({
      where: {
        id,
        userId: req.user.id 
      }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({status: true, message : "task deleted successfully"});
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
};