import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (result.rows.length > 0) {
      return new Response(JSON.stringify({ error: "Email already exists" }), {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertResult = await sql`
      INSERT INTO users (email, password, name)
      VALUES (${email}, ${hashedPassword}, ${name})
      RETURNING id, email, name
    `;

    const user = insertResult.rows[0];
    return new Response(
      JSON.stringify({
        message: "User created successfully",
        user: { id: user.id, email: user.email, name: user.name },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during signup:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
