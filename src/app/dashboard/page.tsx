// /app/dashboard/page.tsx

import { fetchCategories, fetchPosts } from "@/app/lib/data";
import Dashboard from "./components/Dashboard";


export default async function Page() {
  // Fetch data on the server
  const posts = await fetchPosts();
  const categories = await fetchCategories();

  return (
    // Pass data as props to the Dashboard client component
    <Dashboard initialPosts={posts} initialCategories={categories} />
  );
}
