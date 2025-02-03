import { NextRequest, NextResponse } from "next/server";
import { deletePostById, updatePostById } from "@/app/lib/data";

export async function PUT(req: NextRequest) {
  try {
    const { postId, userId, title, content, image, tags, category } = await req.json();

    const id = req.nextUrl.pathname.split("/").pop(); 

    if (!id || postId !== id) {
      return NextResponse.json({ error: "Post ID mismatch or missing" }, { status: 400 });
    }

    const response = await updatePostById(postId, userId, { title, content, image, tags, category });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { postId, userId } = await req.json(); 

    if (!postId || !userId) {
      return NextResponse.json({ error: "Post ID or User ID is missing" }, { status: 400 });
    }

    const id = req.nextUrl.pathname.split("/").pop();

    if (!id || postId !== id) {
      return NextResponse.json({ error: "Post ID mismatch or missing" }, { status: 400 });
    }

    const response = await deletePostById(postId, userId);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 400 });
  }
}
