"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // for redirecting
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  // console.log(status, "@status");
  const router = useRouter();

  useEffect(() => {
    if (status == "unauthenticated") {
      // Redirect the user to the login page if they are not authenticated
      router.push("/auth/login");
    }
  }, [status, router]);


  return <>{children}</>;
};

export default ProtectedRoute;
