import SignupPage from "@/components/auth/signup/page";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Register - The Daily Scribble",
    description: "A blog platform built with Next.js",
    keywords: ["register, signup"]
  };

export default function Signup() {
    return (
        <>
            <SignupPage />
        </>
    )
}