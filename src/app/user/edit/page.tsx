"use client";
import useProfile from "@/hooks/useProfile";
import ProfileEdit from "@/views/profile_edit";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
const Profile = () => {
  const { getProfile } = useProfile();

  const router = useRouter();
  useEffect(() => {
    const profile = getProfile();
    console.log("profile", profile);
    if (!profile) {
      router.push("/user/edit");
    }
  }, []);
  return (
    <ProfileEdit name={""} user_name={""} handle={""} bio={""} avatar={""} />
  );
};
export default Profile;
