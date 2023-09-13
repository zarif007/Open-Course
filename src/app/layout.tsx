import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ClientProviders from "@/components/providers/ClientProviders";
import NavBar from "@/components/nav-bar/Nav.Bar";
import { Toaster } from "../components/ui/Toast";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Course",
  description: "Curate, Create & Share",
  openGraph: {
    images: "/dark-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <ClientProviders>
          <body
            className={`${inter.className} bg-slate-100 text-gray-900 dark:bg-gray-950 dark:text-slate-100 py-2 h-full overflow-x-hidden antialiased`}
          >
            <NavBar />
            {children}
            <Toaster position="bottom-right" />
          </body>
        </ClientProviders>
      </html>
    </ClerkProvider>
  );
}

//
