  // import { db } from "@vercel/postgres";

// const client = await db.connect();

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


// async function fetchPostsByCategory(category:"67163f16-fce6-4c05-955e-12b4ad353b02") {
//   const data = await client.sql`
//     SELECT 
//     * FROM posts
//     WHERE category = ${category}
//   `;

//   return data.rows;
// }

// async function fetchPostsById(postId:string) {
//   const data = await client.sql`
//     SELECT 
//     * FROM posts
//     WHERE id = ${postId}
//   `;

//   return data.rows;
// }

// async function fetchPostsByUserId(postId:string) {
//   const data = await client.sql`
//     SELECT 
//     * FROM posts
//     WHERE user_id = ${postId}
//   `;

//   return data.rows;
// }



// export async function GET() {
//   try {
//     // const posts = await listPosts();
//     const posts = await fetchPostsByCategory("67163f16-fce6-4c05-955e-12b4ad353b02");
//     // const posts = await fetchPostsById('58d8ba48-fbca-4556-b823-ead54d9c13c4');
//     // const posts = await fetchPostsByUserId('8601d642-1850-41d3-a002-07cc1f51fa48');
//     return new Response(JSON.stringify(posts), {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }


export {};