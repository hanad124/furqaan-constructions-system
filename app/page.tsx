"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sign } from "crypto";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../auth";

export default function Home() {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);

  if (!state.user) {
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
