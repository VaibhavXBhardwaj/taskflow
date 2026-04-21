import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { taskSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const tasks = await db.task.findMany({
      where: {
        userId: session.userId,
        ...(status && status !== "ALL" ? { status: status as any } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: tasks });
  } catch (error) {
    console.error("[TASKS_GET]", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = taskSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const task = await db.task.create({
      data: {
        ...result.data,
        userId: session.userId,
        dueDate: result.data.dueDate ? new Date(result.data.dueDate) : null,
      },
    });

    return NextResponse.json({ data: task }, { status: 201 });
  } catch (error) {
    console.error("[TASKS_POST]", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}