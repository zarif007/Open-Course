import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  PinterestShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  PinterestIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  XIcon,
  WhatsappIcon,
} from "react-share";
import { Label } from "../ui/Label";

const ShareOnSocialsComp = ({ url }: { url: string }) => {
  return (
    <div>
      <Label>Share on Socials</Label>
      <div className="flex flex-wrap gap-2 items-center justify-center my-3">
        <EmailShareButton url={url}>
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
        <FacebookShareButton url={url}>
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <FacebookMessengerShareButton url={url} appId="forwardedRef">
          <FacebookMessengerIcon size={40} round={true} />
        </FacebookMessengerShareButton>
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
        <TelegramShareButton url={url}>
          <TelegramIcon size={40} round={true} />
        </TelegramShareButton>
        <WhatsappShareButton url={url}>
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default ShareOnSocialsComp;
