"use client";
import LargeHeading from "@/components/ui/LargeHeading";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();
  console.log(theme)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-32 md:pt-60 w-full max-w-7xl mx-auto">
      <LargeHeading size="lg" className="gradient-text">
        Curate, Create & Share - All for free
      </LargeHeading>
    </main>
  );
}
