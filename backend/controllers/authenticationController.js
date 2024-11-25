import { User } from '../models/userModel.js';

export const signUp = async (req, res) => {
  const { username, email, uid } = req.body;
  console.log("Sign up requested:", req.body);

  try {
    if (!username || !email || !uid) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const user = new User({ 
        username, 
        email, 
        uid
     });
    await user.save();
    return res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error occurred while signing up:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
}
