import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const Account:React.FC<{user:any}> = ({user}) => {

  const [username ,  setUsername] = useState(user?.username || '');
  const [email ,  setEmail] = useState(user?.email || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();
  return (
    <div>
account
    </div>
  )
}

export default Account;