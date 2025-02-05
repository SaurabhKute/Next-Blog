import { NextResponse } from "next/server";
import { fetchPostsByUserId } from "@/app/lib/data";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  //   console.log(userId,"!!!");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId parameter" },
      { status: 400 }
    );
  }

  try {
    // console.log("Inside try block")
    const posts = await fetchPostsByUserId(userId);
    // console.log(posts,"###");
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts by user ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
