import React, { useEffect, useState } from "react";
import { PiCopySimpleDuotone } from "react-icons/pi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import Link from "next/link";

const CopyToClipboardComp = ({ url }: { url: string }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  useEffect(() => {
    setIsCopied(false);
  }, [url]);
  return (
    <Popover>
      <PopoverTrigger>
        <CopyToClipboard text={url} onCopy={() => setIsCopied(true)}>
          <PiCopySimpleDuotone
            className={`h-8 w-8 cursor-pointer ${isCopied && "text-rose-500"}`}
          />
        </CopyToClipboard>
      </PopoverTrigger>
      <PopoverContent className="w-fit bg-rose-500 dark:bg-rose-500 border-0 py-1">
        Copied!
      </PopoverContent>
    </Popover>
  );
};

export default CopyToClipboardComp;
