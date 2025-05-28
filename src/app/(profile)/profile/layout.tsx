import type { Metadata } from 'next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return <section className="pb-4 h-full min-h-screen">{children}</section>;
}
