'use client';

import LoginPage from "@/components/auth/login/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {

    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {

            router.replace('/');
        }
    }, [session, router]);



    return (
        <LoginPage />
    )
}