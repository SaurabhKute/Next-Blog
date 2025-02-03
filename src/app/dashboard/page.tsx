// /app/dashboard/page.tsx

import { fetchCategories, fetchPosts } from "@/app/lib/data";
import Dashboard from "./components/Dashboard";


export default async function Page() {

  const posts = await fetchPosts();
  const categories = await fetchCategories();


  return (
    <Dashboard initialPosts={posts} initialCategories={categories} />
  );
}
