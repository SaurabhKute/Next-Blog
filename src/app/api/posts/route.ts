import { NextResponse } from "next/server";
import { fetchPosts } from "@/app/lib/data";
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category") || "0";
    const search = url.searchParams.get("search") || "";
    const userId = url.searchParams.get("userId") || null || undefined;

    const posts = await fetchPosts(userId, category, search);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, image, author, tags, category, user_id } =
      await request.json();

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const userCheck = await sql`
      SELECT id FROM users WHERE id = ${user_id};
    `;

    if (userCheck.rowCount === 0) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // const createdAt = new Date().toISOString();
    // const updatedAt = createdAt;

    const result = await sql`
      INSERT INTO posts (title, content, image, author, tags, category, user_id) 
      VALUES (${title}, ${content}, ${image}, ${author}, ${JSON.stringify(
      tags
    )}, ${category}, ${user_id})
      RETURNING id;
    `;

    const insertedPost = result.rows[0];

    return NextResponse.json(
      { message: "Blog published successfully!", id: insertedPost?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error publishing blog:", error);
    return NextResponse.json(
      { error: "Failed to publish blog" },
      { status: 500 }
    );
  }
}
