"use client";
import React, { useState, useEffect } from "react";
import { FaHome, FaUser, FaCog,  } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";

import CreatePost from "@/components/CreatePost";
import Link from "next/link";
const Feed = ({ initialposts, topics }) => {
  const [posts, setPosts] = useState(initialposts);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [forYouFeed, setForYouFeed] = useState([]);

  // Function to add a new post to the feed
  const handleNewPost = (content) => {
    const newPost = {
      id: posts.length + 1,
      user: {
        username: "@currentUser",
        name: "Current User",
        avatar: "/avatar.png",
      },
      content,
      likes: 0,
      reposts: 0,
      comments: 0,
      hashtags: [],
      timestamp: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]); // Add the new post at the top of the feed
  };

  useEffect(() => {
    // Populate trending topics and For You feed
    // setTrendingTopics(getTrendingTopics(topics));
    // setForYouFeed(getForYouFeed(posts, userPreferences));
  }, [posts, topics]);

  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      {/* Sidebar - Icons only on smaller screens */}
      <aside className="w-20 lg:w-64 bg-white border-r flex-shrink-0">
        <nav className="mt-8 space-y-4">
          <Link
            href="/"
            className="flex items-center justify-center lg:justify-start p-3 text-lg font-semibold text-gray-700 rounded hover:bg-gray-200"
          >
            <FaHome className="w-6 h-6" />
            <span className="ml-3 hidden lg:inline">Home</span>
          </Link>
          <Link
            href={"/chat"}
            className="flex items-center justify-center lg:justify-start p-3 text-lg font-semibold text-gray-700 rounded hover:bg-gray-200"
          >
            <IoChatbox className="w-6 h-6" />
            <span className="ml-3 hidden lg:inline">AI</span>
          </Link>
          <Link
            href={"/profile"}
            className="flex items-center justify-center lg:justify-start p-3 text-lg font-semibold text-gray-700 rounded hover:bg-gray-200"
          >
            <FaUser className="w-6 h-6" />
            <span className="ml-3 hidden lg:inline">Profile</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center justify-center lg:justify-start p-3 text-lg font-semibold text-gray-700 rounded hover:bg-gray-200"
          >
            <FaCog className="w-6 h-6" />
            <span className="ml-3 hidden lg:inline">Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main Feed */}
      <main className="flex-1 bg-white p-4 lg:p-6">
        <div className="max-w-xl mx-auto">
          {/* Create Post Component */}
          <CreatePost onPostSubmit={handleNewPost} />

          {/* For You Feed */}
          <div className="space-y-4">
            {forYouFeed.map((post) => (
              <div key={post.id} className="p-4 bg-white shadow-md rounded-lg">
                <div className="flex items-center mb-2">
                  <img
                    src={post.user.avatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold">{post.user.name}</h3>
                    <p className="text-sm text-gray-500">
                      {post.user.username}
                    </p>
                  </div>
                </div>
                <p>{post.content}</p>
                <div className="flex justify-between text-gray-500 mt-2">
                  <span>💬 {post.comments}</span>
                  <span>🔁 {post.reposts}</span>
                  <span>❤️ {post.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Right Sidebar - Hidden on smaller screens */}
      <aside className="hidden lg:block lg:w-64 bg-gray-50 p-4">
        <h3 className="text-lg font-bold mb-4">Trends</h3>
        <div className="space-y-4">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="p-3 bg-white shadow-md rounded-lg">
              <h4 className="font-semibold">{topic.name}</h4>
              <p className="text-sm text-gray-500">{topic.posts} posts</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Feed;
