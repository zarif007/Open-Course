import constructMetadata from '@/utils/constructMetadata';
import type { Metadata } from 'next';

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return (
    <section className="h-full min-h-screen w-full mx-auto flex flex-col">
      {children}
    </section>
  );
}
