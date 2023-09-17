"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sign } from "crypto";
import { db } from "@/firebase";

export default function Home() {
  return (
    <>
      <Button variant="outline">
        <Link href="/login">Login</Link>
      </Button>{" "}
    </>
  );
}
