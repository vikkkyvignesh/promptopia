"use client";
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [SearchText, setSearchText] = useState("");

  const [posts, setPosts] = useState([]);

  const handleSearch = (e) => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch("api/prompt");
      const data = await resp.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          value={SearchText}
          onChange={handleSearch}
          placeholder="Search for a tag or a username"
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
