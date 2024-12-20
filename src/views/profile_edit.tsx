import React, {useState} from 'react';
import useProfile from '@/hooks/useProfile';
const ProfileEdit = ({
  name,
  handle,
  bio,
  avatar,
}: {
  name: string;
  handle: string;
  bio: string;
  avatar: string;
}) => {
  const [_name, setName] = useState(name);
  const [_handle, setHandle] = useState(handle);
  const [_bio, setBio] = useState(bio);
  const [_avatar, setAvatar] = useState(
    avatar ||
      'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
  );
  const [blob, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const {editProfile} = useProfile();
  // Handle avatar file upload
  const handleAvatarChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setAvatar(e.target?.result); // Update the avatar preview
      };
      reader.readAsDataURL(file); // Convert file to a base64 string
    }
  };

  return (
    <div className='flex flex-col justify-start base-100 max-w-screen-lg mx-auto w-full border p-5'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-bold'>Edit Profile</h1>
        {!loading && (
          <button
            className='btn btn-outline'
            onClick={async () => {
              console.log('Edit Profile');
              setLoading(true);
              await editProfile({
                name: _name,
                handle: _handle,
                bio: _bio,
                avatar: blob,
              });
              setLoading(false);
            }}>
            Done
          </button>
        )}
      </div>

      {/* Section 1 - Banner and Profile Pictures */}
      <div className='bg-stone h-24 base-content flex items-center p-4 relative'>
        <div className='avatar relative'>
          <div className='w-24 h-24'>
            <img className='rounded-full' src={_avatar} alt='User Avatar' />
          </div>

          {/* Edit Button */}
          <label
            htmlFor='avatar-upload'
            className='absolute bottom-0 right-0 btn btn-circle btn-sm btn-outline bg-white cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4 text-gray-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M15.232 5.232l3.536 3.536m-2.036-2.036a2.5 2.5 0 113.536 3.536L7.5 21H3v-4.5L15.232 5.232z'
              />
            </svg>
          </label>
          {/* Hidden file input */}
          <input
            id='avatar-upload'
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleAvatarChange}
          />
        </div>
      </div>

      {/* Divider */}
      <div className='divider'></div>

      {/* Name Input */}
      <div className='form-control mb-4'>
        <label className='label'>
          <span className='label-text'>Name</span>
        </label>
        <input
          type='text'
          placeholder='Enter your name'
          className='input input-bordered'
          value={_name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Handle Input */}
      <div className='form-control mb-4'>
        <label className='label'>
          <span className='label-text'>Handle</span>
        </label>
        <input
          type='text'
          placeholder='@username'
          className='input input-bordered'
          value={_handle}
          onChange={(e) => setHandle(e.target.value)}
        />
      </div>

      {/* Bio Text Area */}
      <div className='form-control mb-4'>
        <label className='label'>
          <span className='label-text'>Bio</span>
        </label>
        <textarea
          className='textarea textarea-bordered'
          placeholder='Tell us about yourself'
          value={_bio}
          onChange={(e) => setBio(e.target.value)}></textarea>
      </div>

      {/* Social Links + Integrations */}
      {/* Additional input fields or sections can go here */}
    </div>
  );
};

export default ProfileEdit;
