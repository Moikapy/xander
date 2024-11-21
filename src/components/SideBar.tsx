"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaHome, FaUser, FaCog, FaPlus } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import Link from "next/link";
import { useAuthContext } from "@/providers/AuthProvider";
export default function SideBar({ ...props }) {
  /* Sidebar - Positioned at the bottom on small screens */
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return null;
  }

  return (
    isAuthenticated && (
      <aside
        className={` fixed bottom-0 left-0 w-full border-t sm:relative sm:w-20 xl:w-64 sm:border-r sm:border-t-0 sm:flex sm:flex-col sm:h-auto sm:space-y-4 p-2 sm:p-4 z-10`}
      >
        <nav className="flex justify-around sm:justify-start sm:flex-col space-y-0 sm:space-y-4">
          <Link
            href={"/"}
            className="flex items-center justify-center sm:justify-start p-3 text-lg font-semibold btn rounded"
          >
            <FaHome className="w-6 h-6" />
            <span className="ml-3 hidden xl:inline">Home</span>
          </Link>
          <Link
            href={"/chat"}
            className="flex items-center justify-center sm:justify-start p-3 text-lg font-semibold btn rounded"
          >
            <IoChatbox className="w-6 h-6" />
            <span className="ml-3 hidden xl:inline">AI</span>
          </Link>
          <Link
            href={"/profile"}
            className="flex items-center justify-center sm:justify-start p-3 text-lg font-semibold btn rounded"
          >
            <FaUser className="w-6 h-6" />
            <span className="ml-3 hidden xl:inline">Profile</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center justify-center sm:justify-start p-3 text-lg font-semibold btn rounded"
          >
            <FaCog className="w-6 h-6" />
            <span className="ml-3 hidden xl:inline">Settings</span>
          </Link>
        </nav>
      </aside>
    )
  );
}
