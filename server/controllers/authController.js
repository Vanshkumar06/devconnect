const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/generateToken");


// REGISTER USER
const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "User registered successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// LOGIN USER
// const loginUser = async (req, res) => {

//   try {

//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {

//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id),
//       });

//     } else {

//       res.status(401).json({
//         message: "Invalid email or password",
//       });

//     }

//   } catch (error) {

//     res.status(500).json({
//       message: error.message,
//     });

//   }

// };
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
  token: generateToken(user._id),

  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
  },
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { registerUser, loginUser };