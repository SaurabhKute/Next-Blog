import ProfilePage from "@/components/Forms/ProfileForm";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Profile - The Daily Scribble",
    description: "A blog platform built with Next.js",
    keywords: ["profile, user-profile"]
  };

export default function Profile() {
    return (
        <ProfilePage />
    )
} 