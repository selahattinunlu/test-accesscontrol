"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ac from "@/support/accesscontrol";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { user, logout, canReadAny } = useAuth();

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <main className="max-w-lg mx-auto bg-white p-8 rounded-lg mt-24">
      <Link href="/posts" className="block">
        Posts
      </Link>
      {canReadAny("users") && (
        <Link href="#" className="block">
          Kullanicilar
        </Link>
      )}

      <button onClick={logout}>Logout</button>
    </main>
  );
}
