import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientProviders from '@/components/providers/ClientProviders';
import NavBar from '@/components/nav-bar/Nav.Bar';
import { Toaster } from '../components/ui/Toast';
import constructMetadata from '@/utils/constructMetadata';
import TrpcProviders from './_trpc/TrpcProviders';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

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
            <NextTopLoader
              color="#f43f5e"
              initialPosition={0.08}
              crawlSpeed={200}
              height={6}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #9f1239,0 0 5px #9f1239"
            />

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
