import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

// This handler processes the POST request for user sign-up
export async function POST(request:NextRequest) {
  try {
    // Parse the incoming JSON body
    const { email, password, name } = await request.json();

    // Validate input fields (you can expand on this with more checks)
    if (!email || !password || !name) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    // Check if the email already exists in the database
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (result.rows.length > 0) {
      return new Response(JSON.stringify({ error: 'Email already exists' }), { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const insertResult = await sql`
      INSERT INTO users (email, password, name)
      VALUES (${email}, ${hashedPassword}, ${name})
      RETURNING id, email, name
    `;

    // Return the user details (excluding password)
    const user = insertResult.rows[0];
    return new Response(
      JSON.stringify({ message: 'User created successfully', user: { id: user.id, email: user.email, name: user.name } }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error during signup:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
