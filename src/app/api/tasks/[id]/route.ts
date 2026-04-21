import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { taskSchema } from "@/lib/validations";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await db.task.findFirst({
      where: { id: params.id, userId: session.userId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const body = await req.json();
    const result = taskSchema.partial().safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const task = await db.task.update({
      where: { id: params.id },
      data: {
        ...result.data,
        dueDate: result.data.dueDate ? new Date(result.data.dueDate) : null,
      },
    });

    return NextResponse.json({ data: task });
  } catch (error) {
    console.error("[TASKS_PATCH]", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await db.task.findFirst({
      where: { id: params.id, userId: session.userId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    await db.task.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "Task deleted" });
  } catch (error) {
    console.error("[TASKS_DELETE]", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}