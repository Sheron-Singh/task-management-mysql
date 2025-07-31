const express = require('express');
const router = express.Router();
const { getUserTasks } = require('../controllers/user.ccontroller');
const auth = require('../middleware/auth.middleware');

router.get('/getUserTasks/:id/tasks', auth, getUserTasks);

module.exports = router;
