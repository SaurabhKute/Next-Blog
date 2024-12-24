import { db } from "@vercel/postgres";

const client = await db.connect();

// async function listPosts() {
//   const data = await client.sql`
//     SELECT 
//       posts.id,
//       posts.title,
//       posts.content,
//       posts.image,
//       posts.author,
//       posts.tags,
//       posts.category,
//       posts.created_at,
//       posts.updated_at,
//       users.id AS user_id,
//       users.name AS user_name,
//       users.email AS user_email
//     FROM posts
//     JOIN users ON posts.user_id = users.id
//     ORDER BY posts.created_at DESC; -- Fetch posts in descending order of creation
//   `;

//   return data.rows;
// }

// async function listCategories() {
//   const data = await client.sql`
//     SELECT 
//       categories.id,
//       categories.name
//     FROM categories
//   `;

//   return data.rows;
// }


// async function fetchPostsByCategory(category:"Technology") {
//   const data = await client.sql`
//     SELECT 
//     * FROM posts
//     WHERE category = ${category}
//   `;

//   return data.rows;
// }

async function fetchPostsById(postId:string) {
  const data = await client.sql`
    SELECT 
    * FROM posts
    WHERE id = ${postId}
  `;

  return data.rows;
}



export async function GET() {
  try {
    // const posts = await listPosts();
    // const posts = await fetchPostsByCategory("Technology");
    const posts = await fetchPostsById('58d8ba48-fbca-4556-b823-ead54d9c13c4');
    return new Response(JSON.stringify(posts), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
