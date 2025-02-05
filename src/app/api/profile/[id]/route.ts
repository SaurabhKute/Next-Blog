import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// Fetch user profile (GET)
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const userId = params.id;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const user = await sql`
      SELECT id, name, bio, avatar FROM users WHERE id = ${userId};
    `;

    if (user.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user.rows[0]);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 });
  }
}

// Update user profile (PATCH)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const userId = params.id;
    const { name, bio, avatar } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Ensure at least one field is provided for update
    if (!name && !bio && !avatar) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    await sql`
      UPDATE users
      SET 
        name = COALESCE(${name}, name), 
        bio = COALESCE(${bio}, bio), 
        avatar = COALESCE(${avatar}, avatar)
      WHERE id = ${userId};
    `;

    // Fetch updated user profile
    const updatedUser = await sql`
      SELECT id, name, bio, avatar FROM users WHERE id = ${userId};
    `;

    return NextResponse.json(updatedUser.rows[0]);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 });
  }
}
