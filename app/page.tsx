"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/support/session";

export default function Home() {
  const router = useRouter();
  const user = getSession();

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <main className="max-w-lg mx-auto bg-white p-8 rounded-lg mt-24">
      {user.companies.map((company) => (
        <Link
          key={company.id}
          href={`/company/${company.id}`}
          className="block"
        >
          Company: {company.name}
        </Link>
      ))}
    </main>
  );
}
