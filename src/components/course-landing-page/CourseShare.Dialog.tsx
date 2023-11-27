import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/Dialog";
import TooltipComponent from "../ui/TooltipComponent";
import { FcShare } from "react-icons/fc";
import { Button } from "../ui/Button";
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  PinterestIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  XIcon,
  ViberIcon,
  WhatsappIcon,
} from "react-share";
import { Label } from "../ui/Label";
import Paragraph from "../ui/Paragraph";
import CopyToClipboardComp from "../ui/CopyToClipboard.Comp";

const CourseShareDialog = ({ url }: { url: string }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <TooltipComponent content="Share with people">
          <FcShare className="w-8 h-8 cursor-pointer" />
        </TooltipComponent>
      </DialogTrigger>
      <DialogContent className="bg-slate-100 dark:bg-gray-950 border border-slate-300 dark:border-gray-800 max-w-2xl w-full">
        <Label>Share on Socials</Label>
        <div className="flex flex-wrap gap-2 items-center justify-center my-3">
          <EmailShareButton url={url}>
            <EmailIcon size={40} round={true} />
          </EmailShareButton>
          <FacebookShareButton url={url}>
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={40} round={true} />
          </LinkedinShareButton>
          <TwitterShareButton url={url}>
            <XIcon size={40} round={true} />
          </TwitterShareButton>
          <PinterestShareButton url={url} media="forwardedRef">
            <PinterestIcon size={40} round={true} />
          </PinterestShareButton>
          <RedditShareButton url={url}>
            <RedditIcon size={40} round={true} />
          </RedditShareButton>
          <TelegramShareButton url={url}>
            <TelegramIcon size={40} round={true} />
          </TelegramShareButton>
          <TumblrShareButton url={url}>
            <TumblrIcon size={40} round={true} />
          </TumblrShareButton>
          <ViberShareButton url={url}>
            <ViberIcon size={40} round={true} />
          </ViberShareButton>
          <TelegramShareButton url={url}>
            <TelegramIcon size={40} round={true} />
          </TelegramShareButton>
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={40} round={true} />
          </WhatsappShareButton>
        </div>
        <Label>Copy URL</Label>
        <div className="flex items-center justify-center w-full border-2 border-gray-950 dark:border-slate-100 rounded mb-2 p-2">
          <Paragraph className="text-start font-semibold text-lg truncate-text-1-line">
            {url}
          </Paragraph>
          <CopyToClipboardComp url={url} />
        </div>
        <DialogClose>
          <Button className="w-full">Done?</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CourseShareDialog;
