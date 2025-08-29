import User from "../models/userModel.js";
import {
  registerValidation,
  loginValidation,
} from "../validation/authValidation.js";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const { error } = registerValidation.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });


    // check if the user already exist
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "user already exists" });
    }

    const user = await User.create({ name, email, password, role });

    // return token
    const token = user.generateAuthToken();
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = loginValidation.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "invalid credentials" });

    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res.status(400).json({ message: "invalid credentials" });
    const token = user.generateAuthToken();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
