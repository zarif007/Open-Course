import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Course",
  description: "Curate, Create & Share",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // offset navbar height
  return <section className="py-24 mb-4">{children}</section>;
}
