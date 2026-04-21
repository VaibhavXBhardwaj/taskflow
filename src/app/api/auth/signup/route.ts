import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, signToken, createSessionCookie } from "@/lib/auth";
import { signupSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const user = await db.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    const token = signToken({ userId: user.id, email: user.email });
    const response = NextResponse.json(
      { data: user, message: "Account created successfully" },
      { status: 201 }
    );
    response.cookies.set(createSessionCookie(token));
    return response;
  } catch (error) {
    console.error("[SIGNUP]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}