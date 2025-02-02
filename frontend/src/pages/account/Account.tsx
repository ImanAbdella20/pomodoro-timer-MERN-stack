import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';

const Account: React.FC<{ user: any }> = ({ user }) => {
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingName, setEditingName] = useState(false);

  // Update state if user prop changes
  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setProfileImage(user.profileImage || null);
    }
  }, [user]);

  // Handle profile image change
  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(file);
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save action (to update user data in DB)
  const handleSubmit = async () => {
    try {
      const updatedUser = {
        username,
        email,
        profileImage: profileImage ? previewImage : null, // Use base64 image or null
      };

      // Send updated data to the backend
      const response = await fetch('/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg flex mt-20">
      {/* Profile Image */}
      <div className="flex justify-center mb-6 mr-10">
        <div className="relative">
          <img
            src={previewImage || profileImage || '/default-avatar.png'}
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

      {/* User Details */}
      <div className="flex-1">
        {/* Username */}
        <div className="mb-4">
          <h3 className="text-lg font-medium flex items-center">
            {editingName ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 rounded-md w-full"
                onBlur={() => setEditingName(false)}
              />
            ) : (
              <>
                <span className="mr-2">{username || 'No username set'}</span>
                <FaEdit
                  onClick={() => setEditingName(true)}
                  className="cursor-pointer text-blue-950 hover:text-blue-900"
                />
              </>
            )}
          </h3>
        </div>

        {/* Email */}
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
                <span className="mr-2">{email}</span>
                <FaEdit
                  onClick={() => setEditingEmail(true)}
                  className="cursor-pointer text-blue-950 hover:text-blue-900"
                />
              </>
            )}
          </h3>
        </div>

        {/* Save Button */}
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
