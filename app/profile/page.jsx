'use client';
import React from 'react'
import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/profile';

const MyProfile = () => {
    const {data: session} = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() =>{
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user?.id}/posts`);
          console.log("Console1", response);
          const data = await response.json();
          console.log("Console2", data);
          setPosts(data);
        }
        if(session?.user?.id) fetchPosts();
      }, [])
    const handleEdit = (post) => {
        router.push(`/update-post?id=${post._id}`)
    }
    const handleDelete = async (post) => {
            const hasConfirmed = confirm('Are you sure you want to delete this post?');
            if(hasConfirmed){
                try {
                    await fetch(`/api/prompt/${post._id.toString()}`, {
                        method: 'DELETE',
                    })
                    const filteredPosts = posts.filter((item) => item._id !== post._id);
                    setPosts(filteredPosts);
                } catch (error) {
                    
                }
            }
    }   
  return (
    <Profile 
        name="My"
        desc = "Welcome to my profile"
        data = {posts}
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
    />
  )
}

export default MyProfile