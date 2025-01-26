import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";

import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

import { WishlistProvider } from "@/context/WishlistContext";

import { OrderProvider } from "@/context/OrderContext";
import ReduxProvider from "@/components/ReduxProvider";

// Metadata for the application
export const metadata: Metadata = {
  title: "Marketplace Builder Hackathon",
  description: "An innovative platform for your next marketplace project.",
};

// Wrapper for all global providers
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      <OrderProvider>{children}</OrderProvider>
    </WishlistProvider>
  );
}

// Root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              {/* Global layout structure */}
              <ReduxProvider>
                <Navbar />
                <main className="min-h-screen py-4 px-4 sm:px-6 lg:px-8">
                  {children}
                </main>
                <Toaster />
                <Footer />
              </ReduxProvider>
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
