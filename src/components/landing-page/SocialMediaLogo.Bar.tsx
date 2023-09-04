import Image from "next/image";
import React from "react";
import {
  PiYoutubeLogoDuotone,
  PiFigmaLogoDuotone,
  PiTwitchLogoDuotone,
  PiDropboxLogoDuotone,
  PiPinterestLogoDuotone,
  PiSoundcloudLogoDuotone,
} from "react-icons/pi";

const SocialMediaLogoBar = () => {
  const styles = {
    icon: "h-12 w-12 text-rose-500",
  };
  return (
    <div className="flex space-x-3">
      <PiYoutubeLogoDuotone className={styles.icon} />
      <PiFigmaLogoDuotone className={styles.icon} />
      <PiTwitchLogoDuotone className={styles.icon} />
      <PiDropboxLogoDuotone className={styles.icon} />
      <PiPinterestLogoDuotone className={styles.icon} />
      <PiSoundcloudLogoDuotone className={styles.icon} />
    </div>
  );
};

export default SocialMediaLogoBar;
