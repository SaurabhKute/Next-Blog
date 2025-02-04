import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// Like or Dislike a post
export async function POST(req: Request) {
  try {
    // Parse the JSON body from the request
    const { postId, userId, action } = await req.json();

    // Validate input data
    if (!postId || !userId || !["like", "dislike"].includes(action)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Ensure the userId is a valid UUID string (use the UUID casting)
    const userIdUUID = userId.toString(); // Ensure it's a string (UUID format)

    console.log("userId:", userIdUUID);

    // Perform like or dislike action
    if (action === "like") {
      await sql`
        INSERT INTO likes (post_id, user_id)
        VALUES (${postId}, ${userIdUUID}::UUID)
        ON CONFLICT (post_id, user_id) DO NOTHING;
      `;
    } else if (action === "dislike") {
      await sql`
        DELETE FROM likes
        WHERE post_id = ${postId} AND user_id = ${userIdUUID}::UUID;
      `;
    }

    // Fetch the updated total likes count for the post
    const totalLikes = await sql`
      SELECT COUNT(*) AS count FROM likes WHERE post_id = ${postId};
    `;

    return NextResponse.json({
      postId,
      totalLikes: totalLikes.rows[0].count,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// Get the total likes for a post (Optional - If you want to fetch likes initially)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const totalLikes = await sql`
      SELECT COUNT(*) AS count FROM likes WHERE post_id = ${postId};
    `;

    return NextResponse.json({ postId, totalLikes: totalLikes.rows[0].count });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
