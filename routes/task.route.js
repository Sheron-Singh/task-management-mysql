const express = require('express');
const router = express.Router();
const { addTask, getTasks, updateTask, getTaskById, deleteById  } = require('../controllers/task.controller');
const auth = require('../middleware/auth.middleware');

router.post('/create', auth, addTask);
router.get('/getalltask', auth, getTasks);
router.put('/update/:id', auth, updateTask);
router.get('/gettaskbyid/:id', auth, getTaskById);
router.delete('/deletebyid/:id', auth, deleteById);

module.exports = router;
