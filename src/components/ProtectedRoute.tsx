"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  // console.log(status, "@status");
  const router = useRouter();

  useEffect(() => {
    if (status == "unauthenticated") {

      router.push("/auth/login");
    }
  }, [status, router]);


  return <>{children}</>;
};

export default ProtectedRoute;
