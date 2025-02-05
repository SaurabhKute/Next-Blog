import { Category, Post, PostUpdate, UserProfileUpdate } from "@/types/types";
import { sql } from "@vercel/postgres";


export async function fetchPosts(
  userId?: string,
  category?: string,
  search?: string
) {
  // console.log(category,"@category")
  try {
    let queryText = `
      SELECT 
        posts.*, 
        COALESCE(COUNT(likes.post_id), 0) AS total_likes,
        CASE 
          WHEN $1::UUID IS NOT NULL AND EXISTS (
            SELECT 1 FROM likes WHERE likes.post_id = posts.id AND likes.user_id = $1::UUID
          ) THEN TRUE
          ELSE FALSE
        END AS is_liked
      FROM posts
      LEFT JOIN likes ON posts.id = likes.post_id
      WHERE 1=1
    `;

    const queryParams: (string | number | null)[] = [userId ?? null];
    let paramIndex = 1;

    if (category && category !== "0") {
      queryText += ` AND posts.category = $${++paramIndex}`;
      queryParams.push(category);
    }

    if (search) {
      queryText += ` AND posts.title ILIKE $${++paramIndex}`;
      queryParams.push(`%${search}%`);
    }

    queryText += " GROUP BY posts.id";
    queryText += " ORDER BY posts.created_at DESC";

    const data = await sql.query(queryText, queryParams);

    // console.log(data.rows, "Data.rows")
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts.");
  }
}

export async function fetchPostsByUserId(userId: string) {
  try {
    const data = await sql<Post[]>`
      SELECT 
        posts.*, 
        COALESCE(COUNT(likes.post_id), 0) AS total_likes,
        CASE 
          WHEN ${userId}::UUID IS NOT NULL AND EXISTS (
            SELECT 1 FROM likes WHERE likes.post_id = posts.id AND likes.user_id = ${userId}::UUID
          ) THEN TRUE
          ELSE FALSE
        END AS is_liked
      FROM posts
      LEFT JOIN likes ON posts.id = likes.post_id
      WHERE posts.user_id = ${userId}::UUID
      GROUP BY posts.id
      ORDER BY posts.created_at DESC
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts by user ID.");
  }
}

export async function fetchCategories() {
  try {
    const data = await sql<Category>`SELECT * FROM categories`;

    // console.log(data, "@data");

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts.");
  }
}

export async function fetchPostById(postId: string, userId: string) {
  try {
    const data = await sql<Post[]>`
      SELECT 
        posts.*, 
        COALESCE(COUNT(likes.post_id), 0) AS total_likes,
        CASE 
          WHEN ${userId}::UUID IS NOT NULL AND EXISTS (
            SELECT 1 FROM likes WHERE likes.post_id = posts.id AND likes.user_id = ${userId}::UUID
          ) THEN TRUE
          ELSE FALSE
        END AS is_liked
      FROM posts
      LEFT JOIN likes ON posts.id = likes.post_id
      WHERE posts.id = ${postId}::UUID
      GROUP BY posts.id
    `;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post by ID.");
  }
}

export async function updatePostById(
  postId: string,
  userId: string,
  updatedData: PostUpdate
) {
  try {
    // console.log("Updating post with ID:", postId, "for user:", userId);

    const post = await sql`
      SELECT * FROM posts WHERE id = ${postId} AND user_id = ${userId}
    `;

    if (post.rows.length === 0) {
      throw new Error(
        "Post not found or user not authorized to update this post."
      );
    }

    const tagsArray =
      updatedData.tags && updatedData.tags.length > 0
        ? JSON.stringify(updatedData.tags) // Store as JSON
        : null;

    const updatedPost = await sql`
      UPDATE posts
      SET
        title = ${updatedData.title},
        content = ${updatedData.content},
        image = ${updatedData.image},
        tags = ${tagsArray}, -- Ensure tags are stored correctly
        category = ${updatedData.category},
        updated_at = NOW()
      WHERE id = ${postId} AND user_id = ${userId}
      RETURNING *;
    `;

    // console.log("Updated post:", updatedPost.rows[0]);

    return updatedPost.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update post.");
  }
}

export async function deletePostById(postId: string, userId: number) {
  try {
    const post = await sql`
      SELECT *
      FROM posts
      WHERE id = ${postId} AND user_id = ${userId}
    `;

    if (post.rows.length === 0) {
      throw new Error(
        "Post not found or user not authorized to delete this post."
      );
    }

    await sql`
      DELETE FROM posts
      WHERE id = ${postId};
    `;

    return { message: "Post deleted successfully." };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete post.");
  }
}

export async function fetchUserProfile(userId: string) {
  try {
    const data = await sql`
      SELECT id, name, email, bio, created_at FROM users WHERE id = ${userId}
    `;

    // console.log(data.rows[0], "!!!");
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user profile.");
  }
}

export async function updateUserProfile(
  userId: string,
  updatedData: UserProfileUpdate
) {
  try {
    const { name, bio } = updatedData;

    const updatedUser = await sql`
      UPDATE users
      SET 
        name = COALESCE(${name}, name),
        bio = COALESCE(${bio}, bio)
      WHERE id = ${userId}
      RETURNING id, name, email, bio;
    `;

    return updatedUser.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update user profile.");
  }
}
