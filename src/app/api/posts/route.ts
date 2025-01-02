import { NextResponse } from "next/server";
import { fetchPosts } from "@/app/lib/data";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category") || "All";

  try {
    const posts = await fetchPosts(category);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
