import { db } from "@vercel/postgres";

const client = await db.connect();

async function listPosts() {
  const data = await client.sql`
    SELECT 
      posts.id,
      posts.title,
      posts.content,
      posts.image,
      posts.author,
      posts.tags,
      posts.category,
      posts.created_at,
      posts.updated_at,
      users.id AS user_id,
      users.name AS user_name,
      users.email AS user_email
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC; -- Fetch posts in descending order of creation
  `;

  return data.rows;
}

async function listCategories() {
  const data = await client.sql`
    SELECT 
      categories.id,
      categories.name
    FROM categories
  `;

  return data.rows;
}



export async function GET() {
  try {
    const posts = await listPosts();
    const categories = await listCategories();
    return new Response(JSON.stringify(categories), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
