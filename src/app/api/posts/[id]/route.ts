import { NextRequest, NextResponse } from "next/server";
import { deletePostById } from "@/app/lib/data";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { postId, userId } = await req.json(); // Extract both postId and userId from the body

    if (!postId || !userId) {
      return NextResponse.json({ error: "Post ID or User ID is missing" }, { status: 400 });
    }

    // Ensure the postId matches the URL parameter
    if (postId !== params.id) {
      return NextResponse.json({ error: "Post ID mismatch" }, { status: 400 });
    }

    // Call the deletePostById function with the postId and userId
    const response = await deletePostById(postId, userId);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 400 });
  }
}
