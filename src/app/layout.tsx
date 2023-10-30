import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientProviders from "@/components/providers/ClientProviders";
import NavBar from "@/components/nav-bar/Nav.Bar";
import { Toaster } from "../components/ui/Toast";
import constructMetadata from "@/utils/constructMetadata";
import TrpcProviders from "./_trpc/TrpcProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = constructMetadata();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClientProviders>
        <TrpcProviders>
          <body
            className={`${inter.className} bg-slate-100 text-gray-900 dark:bg-gray-950 dark:text-slate-100 py-2 h-full overflow-x-hidden antialiased`}
          >
            <NavBar />
            {children}
            <Toaster position="bottom-right" />
          </body>
        </TrpcProviders>
      </ClientProviders>
    </html>
  );
}

//
