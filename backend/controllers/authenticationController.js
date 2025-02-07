import admin from '../config/fireBaseAdmin.js';
import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

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

    // Generate a custome JWT

    const token = jwt.sign( { 
      user: 
      { 
        id: uid, 
        email 
      } 
    }, 
    process.env.SECRET_KEY, 
    { 
      expiresIn: '1h' 
    });

    return res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return res.status(500).json({ message: "Error verifying ID token" });
  }
}

export const updateUserProfile = async (req, res) => {
  const { username, email } = req.body; // Get updated username and email
  const userId = req.user.id; // Assuming the user is authenticated

  // Check if profile image is updated (file is uploaded)
  const profileImage = req.file ? req.file.path : null;

  try {
    // Prepare the update data object
    const updateData = { username, email };

    // Only add profile image to update if it's provided
    if (profileImage) {
      updateData.profileImage = profileImage;
    }

    // Update user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    // If user not found, return an error
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return updated user data
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};


export const deleteAccount = async (req, res) => {
  const { uid } = req.body;

  console.log('Received UID:', uid);

  try {
    // Use findOne to search for the user by 'uid' instead of using findById
    const user = await User.findOne({ uid });  // Use `findOne` with the 'uid' field, not `findById`

    if (!user) {
      return res.status(404).send({ error: 'User not found in the database.' });
    }

    // Delete the user by 'uid' using findOneAndDelete
    await User.findOneAndDelete({ uid });  // Delete using the 'uid'

    res.status(200).send({ message: 'Account deleted from database.' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Failed to delete account' });
  }
};

