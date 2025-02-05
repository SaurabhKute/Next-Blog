import { fetchCategories } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await fetchCategories();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
