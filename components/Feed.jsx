'use client';
import React from 'react'
import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  
  return (
    <div className='mt=16 prompt_layout '>
      { data &&
        data.map((post, index) => (
          <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
        }
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (e) => {

  }
  const [posts, setPosts] = useState([]);

  useEffect(() =>{
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      console.log("Console1", response);
      const data = await response.json();
      console.log("Console2", data);
      setPosts(data);
    }
    fetchPosts();
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center '>
        <input type="text" 
        placeholder="Search for a tag or username"
        value={searchText}
        onChange={handleSearchChange} 
        required
        className='search_input peer' />
      </form>

      <PromptCardList 
      data={posts}
      handleTagClick = {() => {}}
      
      />
          </section>
  )
}

export default Feed