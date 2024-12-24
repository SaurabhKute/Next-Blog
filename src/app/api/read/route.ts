import { fetchPostById } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  
  // Use an empty string as a fallback if postId is not found
  const postId = new URLSearchParams(url.search).get('postId') || '';

  try {
    // Ensure postId is a valid string
    const posts = await fetchPostById(postId);
    // console.log(posts, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
