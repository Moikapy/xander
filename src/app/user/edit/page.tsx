'use client';
import useProfile from '@/hooks/useProfile';
import useAuth from '@/hooks/useAuth';
import ProfileEdit from '@/views/profile_edit';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Loading from '@/components/Loading';

const ProfileEditPage = () => {
  const router = useRouter();
  const {auth}: any = useAuth();
  const {getProfile} = useProfile();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{
    name: string;
    user_name: string;
    handle: string;
    bio: string;
    avatar: string;
  } | null>(null);

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
    <ProfileEdit
      name={profile?.name}
      user_name={profile?.user_name}
      handle={profile?.handle}
      bio={profile?.bio}
      avatar={profile?.avatar}
    />
  ) : (
    <Loading />
  );
};
export default ProfileEditPage;
