import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <SessionProvider>
                <Navbar />
                <Toaster  position="top-center" reverseOrder={false}/>
                <ProtectedRoute>
                  {children}
                </ProtectedRoute>
                  </SessionProvider>
                  <Footer />
            </body>
        </html>
    );
}
