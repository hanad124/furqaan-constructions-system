"use client";

import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sign } from "crypto";

export default function Home() {
  const { isSignedIn, user } = useUser();

  return (
    <>
      {isSignedIn ? (
        <>
          <div className="">Hello, {user.firstName}! Welcome to Clerk</div>
          {/* <UserButton afterSignOutUrl="/" /> */}
          <SignOutButton className="bg-red-500" />
        </>
      ) : (
        <>
          <Button variant="outline">
            <Link href="/sign-in">Sign In</Link>
          </Button>{" "}
        </>
      )}
    </>
  );
}
