import admin from '../config/fireBaseAdmin.js';
import { User } from '../models/userModel.js';

// Sign Up Function
export const signUp = async (req, res) => {
  const { username, email, uid } = req.body;

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

// Login Function
export const login = async (req, res) => {
  const { email, idToken } = req.body;
  try {

    if(!idToken){
      throw new Error("ID token is missing");
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid } = decodedToken;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    return res.status(200).json({ message: "User authenticated successfully", uid });
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return res.status(500).json({ message: "Error verifying ID token" });
  }
}
