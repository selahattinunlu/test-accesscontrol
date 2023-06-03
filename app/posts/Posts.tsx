"use client";

import { useAuth } from "@/context/AuthContext";
import { Post } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Posts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch(`/api/posts?username=${user}`);
    const data = await response.json();
    setPosts(data);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg mt-24">
      <Link
        href="/posts/create"
        className="bg-indigo-500 text-white py-2 px-6 rounded-lg inline-block"
      >
        New Post
      </Link>
      {posts.map((post) => (
        <div key={post.id}>
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
