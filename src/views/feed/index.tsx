'use client';
import React, {useState, useEffect, useRef} from 'react';
import {FaHome, FaUser, FaCog, FaPlus} from 'react-icons/fa';
import {IoChatbox} from 'react-icons/io5';
import CreatePost from '@/components/CreatePost';
import Link from 'next/link';
import ChatView from '../chat';

const Feed = ({initialposts, topics}) => {
  const [posts, setPosts] = useState(initialposts);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [forYouFeed, setForYouFeed] = useState([]);
  const [showBottomNav, setShowBottomNav] = useState(true);
  const [showPostButton, setShowPostButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState('feed');
  const createPostRef = useRef(null);
  let scrollTimeoutRef = useRef(null);

  const handleNewPost = (content) => {
    const newPost = {
      id: posts.length + 1,
      user: {
        username: '@currentUser',
        name: 'Current User',
        avatar: '/avatar.png',
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
    const handleScroll = () => {
      // Hide the bottom nav when scrolling
      setShowBottomNav(false);

      // Clear any existing timeout to avoid multiple executions
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      // Set a timeout to show the bottom nav after scrolling has stopped
      scrollTimeoutRef.current = setTimeout(() => {
        setShowBottomNav(true);
      }, 150); // Adjust delay as needed
    };

    // Observe "Create Post" section visibility to show floating button
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowPostButton(!entry.isIntersecting);
      },
      {threshold: 0.1}
    );
    if (createPostRef.current) observer.observe(createPostRef.current);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (createPostRef.current) observer.unobserve(createPostRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <div className='flex flex-col sm:flex-row min-h-screen bg-gray-100'>
      {/* Sidebar - Positioned at the bottom on small screens */}
      <aside
        className={`${
          showBottomNav ? 'flex' : 'hidden'
        } fixed bottom-0 left-0 w-full bg-white border-t sm:relative sm:w-20 xl:w-64 sm:border-r sm:border-t-0 sm:flex sm:flex-col sm:h-auto sm:space-y-4 p-2 sm:p-4 z-10`}>
        <nav className='flex justify-around sm:justify-start sm:flex-col space-y-0 sm:space-y-4'>
          <button
            onClick={() => setView('feed')}
            className='flex items-center justify-center sm:justify-start p-3 text-lg font-semibold text-gray-700 rounded hover:bg-gray-200'>
            <FaHome className='w-6 h-6' />
            <span className='ml-3 hidden xl:inline'>Home</span>
          </button>
          <button
            onClick={() => setView('chat')}
            className='flex items-center justify-center sm:justify-start p-3 text-lg font-semibold text-gray-700 rounded hover:bg-gray-200'>
            <IoChatbox className='w-6 h-6' />
            <span className='ml-3 hidden xl:inline'>AI</span>
          </button>
          <Link
            href={'/profile'}
            className='flex items-center justify-center sm:justify-start p-3 text-lg font-semibold text-gray-700 rounded hover:bg-gray-200'>
            <FaUser className='w-6 h-6' />
            <span className='ml-3 hidden xl:inline'>Profile</span>
          </Link>
          <Link
            href='/settings'
            className='flex items-center justify-center sm:justify-start p-3 text-lg font-semibold text-gray-700 rounded hover:bg-gray-200'>
            <FaCog className='w-6 h-6' />
            <span className='ml-3 hidden xl:inline'>Settings</span>
          </Link>
        </nav>
      </aside>
      {view === 'feed' ? (
        <>
          {/* Main Feed */}
          <main className='flex-1 bg-white p-4 sm:p-6'>
            <div className='max-w-xl mx-auto'>
              <div ref={createPostRef}>
                <CreatePost onPostSubmit={handleNewPost} />
              </div>

              {/* For You Feed */}
              <div className='space-y-4'>
                {forYouFeed.map((post) => (
                  <div
                    key={post.id}
                    className='p-4 bg-white shadow-md rounded-lg'>
                    <div className='flex items-center mb-2'>
                      <img
                        src={post.user.avatar}
                        alt='User Avatar'
                        className='w-10 h-10 rounded-full mr-3'
                      />
                      <div>
                        <h3 className='font-semibold'>{post.user.name}</h3>
                        <p className='text-sm text-gray-500'>
                          {post.user.username}
                        </p>
                      </div>
                    </div>
                    <p>{post.content}</p>
                    <div className='flex justify-between text-gray-500 mt-2'>
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
          <aside className='hidden md:block md:w-96 bg-gray-50 p-4'>
            <h3 className='text-lg font-bold mb-4'>Trends</h3>
            <div className='space-y-4'>
              {trendingTopics.map((topic, index) => (
                <div key={index} className='p-3 bg-white shadow-md rounded-lg'>
                  <h4 className='font-semibold'>{topic.name}</h4>
                  <p className='text-sm text-gray-500'>{topic.posts} posts</p>
                </div>
              ))}
            </div>
          </aside>
        </>
      ) : (
        <ChatView />
      )}

      {/* Floating Post Button */}
      {showPostButton && (
        <button
          onClick={() => setShowModal(true)}
          className='fixed bottom-16 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'>
          <FaPlus className='w-6 h-6' />
        </button>
      )}

      {/* Modal for Creating a Post */}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20'>
          <div className='bg-white rounded-lg p-6 max-w-md w-full'>
            <h2 className='text-xl font-semibold mb-4'>Create a Post</h2>
            <CreatePost
              onPostSubmit={(content) => {
                handleNewPost(content);
                setShowModal(false);
              }}
            />
            <button
              onClick={() => setShowModal(false)}
              className='mt-4 w-full bg-gray-300 text-gray-700 rounded-lg py-2'>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
