// import bcrypt from 'bcrypt';
// import { db } from '@vercel/postgres';
// import { Users, Posts, Categories } from '../lib/dummy';

import {  sql } from "@vercel/postgres";


// const client = await db.connect();

// async function dropTables() {
//   await client.sql`
//     DROP TABLE IF EXISTS posts CASCADE;
//     DROP TABLE IF EXISTS categories CASCADE;
//     DROP TABLE IF EXISTS users CASCADE;
//   `;
// }

// async function seedUsers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL
//     );
//   `;

//   const insertedUsers = await Promise.all(
//     Users.map(async (user) => {
//       const hashedPassword = await bcrypt.hash(user.password, 10);
//       return client.sql`
//         INSERT INTO users (id, name, email, password)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//     }),
//   );

//   return insertedUsers;
// }

// async function seedPosts() {
//   // Create the uuid-ossp extension for UUID generation
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   // Create the posts table if it doesn't exist
//   await client.sql`
//   CREATE TABLE IF NOT EXISTS posts (
//     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//     user_id UUID NOT NULL,
//     title VARCHAR(255) NOT NULL,
//     content TEXT NOT NULL,
//     image VARCHAR(255),
//     author VARCHAR(255),
//     tags JSONB DEFAULT '[]',
//     category VARCHAR(255),
//     created_at TIMESTAMP DEFAULT NOW(),
//     updated_at TIMESTAMP DEFAULT NOW(),
//     FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
//   );
// `;

//   // Insert posts into the posts table
//   const insertedPosts = await Promise.all(
//     Posts.map((post) =>
//       client.sql`
//       INSERT INTO posts (title, content, image, author, tags, category, user_id, created_at, updated_at)
//       VALUES (
//         ${post.title}, 
//         ${post.content}, 
//         ${post.image}, 
//         ${post.author}, 
//         ${JSON.stringify(post.tags)}, 
//         ${post.category}, 
//         ${post.user_id}, 
//         ${post.created_at}, 
//         ${post.updated_at}
//       )
//       ON CONFLICT (id) DO NOTHING;
//     `
//     )
//   );

//   return insertedPosts;
// }

// export async function seedCategories() {
//   // Ensure the uuid extension is enabled for generating UUIDs
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   // Create the categories table if it doesn't exist
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS categories (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL UNIQUE  -- Ensuring unique category names
//     );
//   `;

//   // Insert categories into the table
//   const insertedCategories = await Promise.all(
//     Categories.map((name) =>
//       client.sql`
//         INSERT INTO categories (name)
//         VALUES (${name})
//         ON CONFLICT (name) DO NOTHING  -- Prevent duplicate categories
//         RETURNING *;  -- Return the inserted rows for confirmation
//       `
//     )
//   );

//   return insertedCategories; 
// }



export async function seedLikes() {
  try {
    // Ensure the UUID extension is enabled if needed for UUID generation
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Drop the existing likes table if it exists
    await sql`
      DROP TABLE IF EXISTS likes;
    `;

    // Create the new likes table with correct schema
    await sql`
      CREATE TABLE IF NOT EXISTS likes (
        id SERIAL PRIMARY KEY,  -- Auto-incrementing primary key for the like record
        post_id INT NOT NULL,  -- Post ID that the like corresponds to
        user_id UUID NOT NULL,  -- User ID who liked the post, using UUID type
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  -- Timestamp for when the like was created
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  -- Timestamp for when the like was last updated
        CONSTRAINT unique_like UNIQUE (post_id, user_id)  -- Ensures a user can only like a post once
      );
    `;

    // Optionally, insert some initial data into the likes table
    const insertedLikes = await Promise.all(
      // Sample data for demonstration (You can replace this with actual user and post data)
      [
        { postId: 1, userId: "9c40618a-0ea6-489a-912f-5729eff91742" },  // Example UUID user
        { postId: 2, userId: "2b680f8c-c68e-4a59-835e-473cf8d3c6e9" },  // Example UUID user
      ].map(({ postId, userId }) =>
        sql`
          INSERT INTO likes (post_id, user_id)
          VALUES (${postId}, ${userId}::UUID)  -- Insert with user_id as UUID
          ON CONFLICT (post_id, user_id) DO NOTHING  -- Prevent duplicate likes
          RETURNING *;  -- Return the inserted rows for confirmation
        `
      )
    );

    return insertedLikes;  // Return the result of inserted likes
  } catch (error) {
    console.error("Error seeding likes:", error);
    throw new Error("Failed to seed likes.");
  }
}

  



  export async function GET() {
    const client = sql; // Ensure you have the correct database client
  
    try {
      await client.sql`BEGIN`;  // Start a transaction
  
      // Seed likes data
      await seedLikes();
  
      await client.sql`COMMIT`;  // Commit the transaction if all operations succeed
  
      return new Response(
        JSON.stringify({ message: "Database seeded successfully" }),
        { status: 200 }
      );
    } catch (error:any) {
      console.error("Error during seeding:", error);
      await client.sql`ROLLBACK`;  // Rollback the transaction in case of error
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }
  }
  
export {};