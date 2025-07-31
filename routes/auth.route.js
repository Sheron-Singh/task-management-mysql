const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const upload = require("../middleware/multer.middleware");

router.post('/register', upload.single('profileImage'), register);
router.post('/login', login);

module.exports = router;
