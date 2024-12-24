import { sql } from '@vercel/postgres';
import { Category, Post } from './definations';

export async function fetchPosts(category?:string) {
  try {
    let query;

    if (category && category !== "All") {
      // Query to fetch posts by category
      query = sql<Post>`SELECT * FROM posts WHERE category = ${category}`;
    } else {
      // Query to fetch all posts
      query = sql<Post>`SELECT * FROM posts`;
    }

    const data = await query;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts.');
  }
}

  export async function fetchCategories() {
    try {

      // await new Promise((resolve) => setTimeout(resolve, 3000));
  
      const data = await sql<Category>`SELECT * FROM categories`;
  
      // console.log('Data fetch completed after 3 seconds.');
      // console.log(data, "@data");
  
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch posts.');
    }
  }

  export async function fetchPostsByCategory(category:string) {
    try {
      const data = await sql`
        SELECT * 
        FROM posts
        WHERE category = ${category}
      `;
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch posts by category.');
    }
  }
  
  export async function fetchPostById(postId:string) {
    try {
      const data = await sql<Post>`
        SELECT * 
        FROM posts
        WHERE id = ${postId}
      `;
      return data.rows[0]; // Assuming post ID is unique and will return a single post.
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch post by ID.');
    }
  }

  // export async function updatePostById(postId, userId, updatedData) {
  //   try {
  //     // Checking if the post exists and belongs to the user
  //     const post = await sql`
  //       SELECT * 
  //       FROM posts
  //       WHERE id = ${postId} AND user_id = ${userId}
  //     `;
      
  //     if (post.rows.length === 0) {
  //       throw new Error('Post not found or user not authorized to update this post.');
  //     }
  
  //     // If post exists and belongs to the user, update the post
  //     const updatedPost = await sql`
  //       UPDATE posts
  //       SET 
  //         title = ${updatedData.title}, 
  //         content = ${updatedData.content}, 
  //         image = ${updatedData.image}, 
  //         author = ${updatedData.author}, 
  //         tags = ${updatedData.tags}, 
  //         category = ${updatedData.category}, 
  //         updated_at = NOW()
  //       WHERE id = ${postId}
  //       RETURNING *;
  //     `;
  
  //     return updatedPost.rows[0];
  //   } catch (error) {
  //     console.error('Database Error:', error);
  //     throw new Error('Failed to update post.');
  //   }
  // }

  
  // export async function deletePostById(postId, userId) {
  //   try {
  //     // Checking if the post exists and belongs to the user
  //     const post = await sql`
  //       SELECT * 
  //       FROM posts
  //       WHERE id = ${postId} AND user_id = ${userId}
  //     `;
      
  //     if (post.rows.length === 0) {
  //       throw new Error('Post not found or user not authorized to delete this post.');
  //     }
  
  //     // If post exists and belongs to the user, delete the post
  //     await sql`
  //       DELETE FROM posts
  //       WHERE id = ${postId};
  //     `;
  
  //     return { message: 'Post deleted successfully.' };
  //   } catch (error) {
  //     console.error('Database Error:', error);
  //     throw new Error('Failed to delete post.');
  //   }
  // }
  