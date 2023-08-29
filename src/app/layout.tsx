import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, currentUser } from "@clerk/nextjs";
import ClientProviders from "@/components/ClientProviders";
import NavBar from "@/components/Nav.Bar";
import { Toaster } from "../components/ui/Toast";
import { dark } from "@clerk/themes";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Course",
  description: "Curate, Create & Share",
  openGraph: {
    images: "/dark-logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await currentUser();
  // if (!user) redirect("");
  // const { data } = await axios.get(`${v1MainEndpoint}/user/byExternalId/${user?.id}`);
  // console.log(data.data)
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
