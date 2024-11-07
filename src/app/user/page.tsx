'use client'
import useProfile from "@/hooks/useProfile";
import ProfilePage from "@/views/profile";
import React, { use } from "react";
import { useRouter } from "next/navigation";
const Profile = () => {
  const { getProfile } = useProfile();
  const profile = getProfile();
  const router = useRouter();
  if (!profile) {
    router.push("/user/edit");
  }
  return <ProfilePage name={profile.name} />;
};
export default Profile;
