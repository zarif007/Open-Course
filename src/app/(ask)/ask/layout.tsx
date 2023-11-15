import type { Metadata } from "next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return (
    <section className="py-24 md:py-32 h-full min-h-screen mx-2">
      {children}
    </section>
  );
}
