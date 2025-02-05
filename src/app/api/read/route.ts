import { fetchPostById } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const postId = new URLSearchParams(url.search).get("postId") || "";
  const userId = new URLSearchParams(url.search).get("userId") || null || "";

  try {
    const post = await fetchPostById(postId, userId);

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
