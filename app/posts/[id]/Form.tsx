"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import ac from "@/support/accesscontrol";

interface Props {
  id: string;
}

const Form: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const fetchPost = async () => {
    const response = await fetch(`/api/posts/${id}?username=${user}`);
    const data = await response.json();
    setTitle(data.title);
    setBody(data.body);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  // normally we would like to use axios to interact with API
  // but since this is a test task, we'll just use fetch API of the browser
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        username: user,
      }),
    });

    if (response.status === 403) {
      alert("You are not authorized to create a post");
      return;
    }

    alert("new post has been added");
    router.push("/posts");
  };

  const permissionAttributes = useMemo(() => {
    if (!user) {
      return [];
    }

    return ac.can(user).readAny("post").attributes;
  }, [user]);

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block border border-gray-100 w-full"
        />
      </div>

      {permissionAttributes.includes("body") ||
        (permissionAttributes.includes("*") && (
          <textarea
            className="block border border-gray-100 w-full"
            value={body}
          ></textarea>
        ))}

      <div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-6 rounded-full"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Form;
