import React, { useState } from "react";

const CreatePost = ({ onPostSubmit }) => {
  const [postContent, setPostContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim()) {
      onPostSubmit(postContent); // Pass the content to the parent component
      setPostContent(""); // Reset the textarea after submission
    } else {
      alert("Please write something before posting!");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded mb-4 resize-none"
          placeholder="What are you creating?"
          rows={3}
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="btn px-4 py-2 rounded"
        >
          Post
        </button>
      </form>
      <div className="divider" />
    </div>
  );
};

export default CreatePost;
