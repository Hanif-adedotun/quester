import { NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { z } from "zod";

// Schema for post creation
const createPostSchema = z.object({
  name: z.string().min(1),
});

export async function GET(req: Request) {
  const session = await getServerAuthSession();
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");

  if (action === "hello") {
    const text = searchParams.get("text") ?? "";
    return NextResponse.json({ greeting: `Hello ${text}` });
  }

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (action === "latest") {
    const post = await db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: session.user.id } },
    });
    return NextResponse.json(post ?? null);
  }

  if (action === "secret") {
    return NextResponse.json({
      message: "you can now see this secret message!",
    });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

export async function POST(req: Request) {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = createPostSchema.parse(body);

    const post = await db.post.create({
      data: {
        name: validatedData.name,
        createdBy: { connect: { id: session.user.id } },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
