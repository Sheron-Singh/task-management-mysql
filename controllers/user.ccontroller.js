const { User, Task } = require("../models");

exports.getUserTasks = async (req, res) => {
  const userIdFromParams = parseInt(req.params.id, 10);
  const userIdFromToken = req.user.id;

  console.log("Token userId:", userIdFromToken);
  console.log("URL userId:", userIdFromParams);

  if (userIdFromParams !== userIdFromToken) {
    return res.status(403).json({ message: "Forbidden: You can only view your own tasks." });
  }

  try {
    const user = await User.findByPk(userIdFromParams, {
      include: [{ model: Task, as: 'tasks' }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      userId: user.id,
      fullname: user.fullname,
      totalTasks: user.tasks.length,
      tasks: user.tasks,
      message: user.tasks.length
        ? "Tasks retrieved successfully"
        : "No tasks found for this user"
    });

  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: 'Server error while retrieving tasks' });
  }
};

