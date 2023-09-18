"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const user = sessionStorage.getItem("user");

  if (!user) {
    return null; // Render nothing if there's no user (to avoid briefly showing the protected page)
  }
  return (
    <>
      <Button variant="outline">
        <Link href="/login">Login</Link>
      </Button>{" "}
      <Button
        variant="destructive"
        onClick={() => {
          sessionStorage.removeItem("user");
          router.push("/login");
        }}
      >
        Log out
      </Button>{" "}
    </>
  );
}
