import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <div className="bg-slate-100 text-gray-900 dark:bg-gray-950 dark:text-slate-100 py-2 min-h-screen h-full overflow-x-hidden antialiased flex items-center justify-center">
    <SignUp />
  </div>
}