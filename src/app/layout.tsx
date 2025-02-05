
import Footer from "@/components/common/Footer/Footer";
import Navbar from "@/components/common/Navbar/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SearchProvider } from "@/context/SearchContext";
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
                    <SearchProvider>
                        <Navbar />
                        <Toaster position="top-center" reverseOrder={false} />
                        <ProtectedRoute>
                            {children}
                        </ProtectedRoute>
                    </SearchProvider>
                </SessionProvider>
                <Footer />
            </body>
        </html>
    );
}
