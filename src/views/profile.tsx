import React from "react";

const ProfilePage = ({
  user_name,
  handle,
  bio,
  avatar,
  name,
}: {
  user_name: string;
  handle: string;
  bio: string;
  avatar: string;
  name: string;
}) => {
  return (
    <div className="flex flex-col items-center base-100 max-w-screen-lg mx-auto p-4">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-stone h-32 w-full flex justify-center items-center relative">
          {/* Avatar Image */}
          <div className="avatar relative">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                className="rounded-full"
                src={
                  avatar ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="User Avatar"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* User Info Display */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-2">{name || "User Name"}</h1>
        <p className="text-gray-500">@{handle || "username"}</p>
      </div>

      {/* Bio Display */}
      <div className="max-w-md text-center mb-8">
        <p className="text-gray-700">{bio || "Tell us about yourself"}</p>
      </div>

      {/* Social Links + Integrations (if any) */}
      {/* Optional Section for Additional Info */}
    </div>
  );
};

export default ProfilePage;
