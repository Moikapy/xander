'use client';
import useProfile from '@/hooks/useProfile';
import ProfileEdit from '@/views/profile_edit';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

const Profile = () => {
  const {getProfile} = useProfile();
  const [profile, setProfile] = useState<{
    name: string;
    user_name: string;
    handle: string;
    bio: string;
    avatar: string;
  } | null>(null);
  const router = useRouter();
  async function handleEditProfile() {
    const _profile = await getProfile();
    //console.log('profile', _profile);

    if (!_profile) {
      router.push('/user/edit');
    }
    setProfile(_profile);
  }
  useEffect(() => {
    handleEditProfile();
  }, [profile]);

  return profile ? (
    <ProfileEdit
      name={profile?.name}
      user_name={profile?.user_name}
      handle={profile?.handle}
      bio={profile?.bio}
      avatar={profile?.avatar}
    />
  ) : (
    <div>Loading...</div>
  );
};
export default Profile;
