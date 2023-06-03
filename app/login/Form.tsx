"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Form: React.FC = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const [username, setUsername] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username,
      }),
    });

    if (response.ok) {
      setUser(username);
      window.localStorage.setItem("username", username);
      router.push("/");
    }
  };
  return (
    <form className="space-y-6" action="#" method="POST">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Username
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          onClick={submit}
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default Form;
