export type Post = {
    id: number;
    title: string;
    content: string;
    image: string;
    author: string;
    tags: string[];
    category: string;
    user_id: string;
    created_at: string; // ISO 8601 string
    updated_at: string; // ISO 8601 string
  };
  

  export type Category = {
    id:number;
    name:string;
  }

