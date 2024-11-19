'use client';
import useProfile from '@/hooks/useProfile';
import useAuth from '@/hooks/useAuth';
import ProfilePage from '@/views/profile';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Loading from '@/views/Loading';
import {useAuthContext} from '@/providers/AuthProvider';

const Profile = () => {
  const router = useRouter();
  const {isAuthenticated, loading} = useAuthContext();

  const {getProfile} = useProfile();

  const [profile, setProfile] = useState<{
    name: string | null;
    user_name: string | null;
    handle: string | null;
    bio: string | null;
    avatar: string | null;
  } | null>({
    name: null,
    user_name: null,
    handle: null,
    bio: null,
    avatar: null,
  });
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
    initProfile();
  }, [isAuthenticated, loading, router]);
  async function initProfile() {
    const _profile = await getProfile();
    //console.log('profile', _profile);

    if (!_profile) {
      router.push('/settings');
    }
    setProfile(_profile);
  }
  return !loading ? (
    <div className='m-3'>
      <ProfilePage
        name={profile?.name}
        handle={profile?.handle}
        bio={profile?.bio}
        avatar={profile?.avatar}
      />
    </div>
  ) : (
    <Loading />
  );
};
export default Profile;
