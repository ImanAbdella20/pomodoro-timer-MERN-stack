import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';

const Account: React.FC<{ user: any }> = ({ user }) => {
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  // Use effect to load user data
  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setProfileImage(null); // Handle profile image change
    }
  }, [user]);

  // Handle profile image change
  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(file);
        setPreviewImage(reader.result as string); // Display the selected image as preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission to update profile
  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('newPassword', newPassword);

    // Only append profile image if it was updated
    if (profileImage) {
      formData.append('profileImage', profileImage);
    } else if (user?.profileImage) {
      formData.append('profileImage', user.profileImage);
    }

    try {
      const response = await axios.put(
        `${import.meta.env.REACT_APP_API_URL}/auth/update-profile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Required for file uploads
          },
          withCredentials: true, // Ensure cookies/session are sent if needed
        }
      );

      if (response.status === 200) {
        alert('Changes saved successfully!');
      } else {
        alert('Failed to save changes');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while saving changes');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-700 shadow-md rounded-lg flex mt-20">
      {/* Profile Image Section */}
      <div className="flex justify-center mb-6 mr-10">
        <div className="relative">
          <img
            src={previewImage || user?.profileImage || '/default-avatar.png'}
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="mt-10"
          />
        </div>
      </div>

      {/* Form for Editing User Info */}
      <div className="flex-1">
        {/* Username Field */}     
  <div className="mb-4">
  <h3 className="text-lg font-medium">
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="border p-2 rounded-md w-full"
    />
  </h3>
  </div>


        {/* Email Field */}
        <div className="mb-4">
          <h3 className="text-lg font-medium flex items-center">
            {editingEmail ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded-md w-full"
                onBlur={() => setEditingEmail(false)}
              />
            ) : (
              <>
                <span className="mr-2 text-white">{email}</span>
                <FaEdit
                  onClick={() => setEditingEmail(true)}
                  className="cursor-pointer text-blue-950 hover:text-blue-900"
                />
              </>
            )}
          </h3>
        </div>

        {/* Password Change */}
        <div className="mb-4">
          <h3 className="text-lg font-medium flex items-center">
            {editingPassword ? (
              <>
                <input
                  type="password"
                  placeholder="Current password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 rounded-md w-full mb-2"
                />
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border p-2 rounded-md w-full mb-2"
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border p-2 rounded-md w-full"
                  onBlur={() => setEditingPassword(false)}
                />
              </>
            ) : (
              <button
                onClick={() => setEditingPassword(true)}
                className="text-blue-950 hover:text-blue-900"
              >
                Change Password
              </button>
            )}
          </h3>
        </div>

        {/* Save Changes Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-950 text-white py-2 px-6 rounded-md hover:bg-blue-900 mt-4"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
