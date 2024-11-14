'use client';
import useProfile from '@/hooks/useProfile';
import useAuth from '@/hooks/useAuth';
import ProfilePage from '@/views/profile';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Loading from '@/views/Loading';

const Profile = () => {
  const router = useRouter();
  const {auth}: any = useAuth();
  const {getProfile} = useProfile();
  const [loading, setLoading] = useState(true);
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
    auth().then((isAuth: boolean) => {
      if (!isAuth) {
        router.push('/login');
      }
    });
  }, []);
  async function initProfile() {
    const _profile = await getProfile();
    //console.log('profile', _profile);

    if (!_profile) {
      router.push('/user/edit');
      return;
    }
    setProfile(_profile);
    setLoading(false);
  }
  useEffect(() => {
    initProfile();
  }, []);
  return !loading ? (
    <ProfilePage
      name={profile?.name}
      handle={profile?.handle}
      bio={profile?.bio}
      avatar={profile?.avatar}
    />
  ) : (
    <Loading />
  );
};
export default Profile;
