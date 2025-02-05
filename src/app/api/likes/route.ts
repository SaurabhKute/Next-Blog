import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  try {
    const { postId, userId, action } = await req.json();

    if (!postId || !userId || !["like", "dislike"].includes(action)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const userIdUUID = userId.toString();

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

    const totalLikes = await sql`
      SELECT COUNT(*) AS count FROM likes WHERE post_id = ${postId};
    `;

    return NextResponse.json({
      postId,
      totalLikes: totalLikes.rows[0].count,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    const totalLikes = await sql`
      SELECT COUNT(*) AS count FROM likes WHERE post_id = ${postId};
    `;

    return NextResponse.json({ postId, totalLikes: totalLikes.rows[0].count });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
