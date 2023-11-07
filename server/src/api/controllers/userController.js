const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const jwtSecret = 'keyiste';

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "Kullanıcı bulunamadı." })
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Geçersiz şifre." });
      }
      const token = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });

  }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};