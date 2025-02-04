export type Post = {
  id: number; // Change to string since your post ID is UUID
  title: string;
  content: string;
  image: string;
  author: string;
  tags: string[];
  category: string;
  user_id: string; 
  created_at: string; 
  updated_at: string; 
  total_likes: number; 
  is_liked: boolean;
};


  export type Category = {
    id:number;
    name:string;
  }

