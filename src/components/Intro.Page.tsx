import Image from 'next/image'
import React from 'react'
import { useTheme } from "next-themes";
import Paragraph from './ui/Paragraph';
import LargeHeading from './ui/LargeHeading';
import Typewriter from "react-ts-typewriter";

const IntroPage = () => {
    const { theme } = useTheme()
  return (
    <main className="relative flex flex-col items-center justify-center overflow-x-hidden my-24 md:my-40 w-full max-w-5xl mx-auto">
        <LargeHeading className="underline decoration-rose-500">What is It?</LargeHeading>
        <div className="my-4">
            <Image className="" src={theme === "dark" ? "/whatisit-dark.png" : "/whatisit-light.png"} alt="banner" width={800} height={800} />
          </div>
        <div className="px-2 py-4">
            <LargeHeading size="sm">
                <Typewriter text="A platform where users can compile free content on a topic from the internet and arrange it in a sequential manner to share with others for free." />
            </LargeHeading>
        </div>
    </main>
  )
}

export default IntroPage