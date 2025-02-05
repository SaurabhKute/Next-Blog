import { fetchUserProfile, updateUserProfile } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

// Fetch user profile (GET)
export async function GET(req: NextRequest, { params }: { params: Record<string, string> }) {
  console.log("Received Params:", params);

  if (!params.id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const user = await fetchUserProfile(params.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 });
  }
}

// Update user profile (PATCH)
export async function PATCH(req: NextRequest, { params }: { params: Record<string, string> }) {
  console.log("PATCH request received for user ID:", params.id);

  if (!params.id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const updatedData = await req.json(); // Parse request body
    console.log("Received Data for Update:", updatedData);

    // Ensure updatedData contains at least one valid field
    if (!updatedData.name && !updatedData.bio && !updatedData.avatar) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    // Call function to update user profile
    const updatedUser = await updateUserProfile(params.id, updatedData);

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("Updated User:", updatedUser);

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ error: "Failed to update user profile" }, { status: 500 });
  }
}
