"use client";
import React, { useState } from "react";

const ProfilePage = ({ user_name }) => {
  return (
    <div className="flex flex-col base-100">
      {/* Section 1- Banner and Profile Pictures */}
      <div className="bg-stone h-24 base-content">
        {/* Banner */}
        <div className="bg-stone  w-full">
          {/* Avatar */}
          <div className="flex flex-col items-start justify-center bg-stone-800 h-48">
            <div className="flex items-center justify-start h-24 w-24 bg-stone-700 rounded-full">
              <img
                src="" // Add the user's profile picture here
                alt="Profile Picture"
                className="h-20 w-20 rounded-full bg-white"
              />
            </div>
          </div>
        </div>
        <div className="divider"></div>
      </div>
    </div>
  );
};

export default ProfilePage;
