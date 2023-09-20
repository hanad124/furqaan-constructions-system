import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: any) {
  const body = await req.json();
  const { name, email, password } = await body.data;

  if (!name || !email || !password) {
    return new NextResponse("Missing name, email or password", { status: 400 });
  }

  const exit = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (exit) {
    return new NextResponse("Email already exists", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
