import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LogIn | Open Course",
  description: "Curate, Create & Share",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return (
    <section className="h-full min-h-screen w-full max-w-7xl mx-auto flex flex-col">
      {children}
    </section>
  );
}
