const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const uploadOnCloudinary = require("../utils/cloudinary");
const ApiResponse = require("../utils/ApiResponse");

exports.register = async (req, res, next) => {
  const { fullname, email, password, dob, phone } = req.body;

  if (!fullname || !email || !password || !dob || !phone) {
    return res.status(400).json({
      error: 'All fields (fullname, email, password, dob, phone) are required',
    });
  }

  const formattedDob = new Date(dob);
  if (isNaN(formattedDob)) {
    return next(new AppError("Invalid date format for DOB.", 400));
  }

  let profileImage = null;

if (req.file && req.file.path) {
  console.log("File path for upload:", req.file.path);
  const uploadResult = await uploadOnCloudinary(req.file.path);
  console.log("Cloudinary upload result:", uploadResult);
  if (uploadResult) {
    profileImage = uploadResult.secure_url;
  }
}


  try {
    const user = await User.create({
      fullname,
      email,
      password,
      profileImage,
      dob: formattedDob,
      phone,
    });

    res.status(201).json({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      profileImage: user.profileImage,
      dob: user.dob,
      phone: user.phone,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// LOGIN USER
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Req.body>>>>>>", req.body);
  

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '10h',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
};
