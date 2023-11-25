import React, { useEffect, useState } from "react";
import Paragraph from "../ui/Paragraph";
import { Snippet } from "@nextui-org/react";
import { PiCopySimpleDuotone } from "react-icons/pi";
import { GoProjectSymlink } from "react-icons/go";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import Link from "next/link";

const CourseEmbedRawUrl = ({ url }: { url: string }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  useEffect(() => {
    setIsCopied(false);
  }, [url]);
  return (
    <div className="w-full max-w-3xl mx-auto mt-24 px-6 py-4 flex justify-between items-center my-auto bg-slate-300 dark:bg-gray-800 rounded">
      <Paragraph className="font-semibold text-lg truncate-text-1-line">
        {url}
      </Paragraph>
      <div className="flex space-x-2 items-center">
        <Popover>
          <PopoverTrigger>
            <CopyToClipboard text={url} onCopy={() => setIsCopied(true)}>
              <PiCopySimpleDuotone
                className={`h-8 w-8 cursor-pointer ${
                  isCopied && "text-rose-500"
                }`}
              />
            </CopyToClipboard>
          </PopoverTrigger>
          <PopoverContent className="w-fit bg-rose-500 border-0 py-1">
            Copied!
          </PopoverContent>
        </Popover>
        <Link href={url} target="_blank">
          <GoProjectSymlink className="h-7 w-7 cursor-pointer text-gray-950 dark:text-slate-100" />
        </Link>
      </div>
    </div>
  );
};

export default CourseEmbedRawUrl;
