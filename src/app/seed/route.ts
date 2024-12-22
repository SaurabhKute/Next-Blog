// import bcrypt from 'bcrypt';
// import { db } from '@vercel/postgres';
// import { Users, Posts, Categories } from '../lib/dummy';

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



// export async function GET() {
//   try {
//     await client.sql`BEGIN`;
//     // await dropTables();
//     // await seedUsers();
//     // await seedPosts();
//     // await seedCategories();
//     await client.sql`COMMIT`;

//     return Response.json({ message: 'Database seeded successfully' });
//   } catch (error) {
//     console.error(error);  // Log the error details for easier debugging
//     await client.sql`ROLLBACK`;
//     return Response.json({ error: error }, { status: 500 });
//   }  
// }
