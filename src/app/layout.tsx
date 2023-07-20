import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ClientProviders from "@/components/ClientProviders";
import NavBar from "@/components/Nav.Bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Course",
  description: "Curate, Create & Share",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ClientProviders>
          <body
            className={`${inter.className} bg-slate-100 text-gray-950 dark:bg-gray-950 dark:text-slate-100 py-2 h-full`}
          >
            <NavBar />
            {children}
          </body>
        </ClientProviders>
      </html>
    </ClerkProvider>
  );
}

//
