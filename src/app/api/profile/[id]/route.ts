import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// Fetch user profile (GET)
export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId parameter" },
      { status: 400 }
    );
  }

  try {
    const user = await sql`
      SELECT id, name, email, bio, created_at FROM users WHERE id = ${userId};
    `;

    if (user.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user.rows[0]);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 });
  }
}

// Update user profile (PATCH)
export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId parameter" },
      { status: 400 }
    );
  }

  try {
    const { name, bio, email } = await request.json();

    if (!name && !bio && !email) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    await sql`
      UPDATE users
      SET 
        name = COALESCE(${name}, name), 
        bio = COALESCE(${bio}, bio), 
        email = COALESCE(${email}, email)
      WHERE id = ${userId};
    `;

    const updatedUser = await sql`
      SELECT id, name, email, bio, created_at FROM users WHERE id = ${userId};
    `;

    return NextResponse.json(updatedUser.rows[0]);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 });
  }
}
