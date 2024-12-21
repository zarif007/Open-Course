import type { Metadata } from 'next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return (
    <section className="py-32 h-full min-h-screen max-w-6xl mx-auto">
      {children}
    </section>
  );
}
