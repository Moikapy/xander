'use client';
import useProfile from '@/hooks/useProfile';
import useAuth from '@/hooks/useAuth';
import ProfileEdit from '@/views/profile_edit';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Loading from '@/views/Loading';
import {useAuthContext} from '@/providers/AuthProvider';

const ProfileEditPage = () => {
  const router = useRouter();
  const {isAuthenticated, loading} = useAuthContext();
  const {getProfile} = useProfile();

  const [profile, setProfile] = useState<{
    name: string;
    user_name: string;
    handle: string;
    bio: string;
    avatar: string;
  } | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
    initProfile();
  }, [isAuthenticated, loading, router]);
  async function initProfile() {
    const _profile = await getProfile();
    //console.log('profile', _profile);

    // if (!_profile) {
    //   router.push('/user/edit');
    //   return;
    // }
    setProfile(_profile);
  }

  return !loading ? (
    <ProfileEdit
      name={profile?.name || ''}
      handle={profile?.handle || ''}
      bio={profile?.bio || ''}
      avatar={profile?.avatar || ''}
    />
  ) : (
    <Loading />
  );
};
export default ProfileEditPage;
