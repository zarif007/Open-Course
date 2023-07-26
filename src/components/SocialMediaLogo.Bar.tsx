import Image from "next/image";
import React from "react";
import {
  PiGoogleLogoDuotone,
  PiYoutubeLogoDuotone,
  PiGooglePodcastsLogoDuotone,
  PiMediumLogoDuotone,
  PiDevToLogoDuotone,
  PiGithubLogoDuotone,
} from "react-icons/pi";

const SocialMediaLogoBar = () => {
  const styles = {
    icon: "h-12 w-12 text-orange-500",
  };
  return (
    <div className="flex space-x-3">
      <PiYoutubeLogoDuotone className={styles.icon} />
      <PiGoogleLogoDuotone className={styles.icon} />
      <PiGooglePodcastsLogoDuotone className={styles.icon} />
      <PiMediumLogoDuotone className={styles.icon} />
      <PiDevToLogoDuotone className={styles.icon} />
      <PiGithubLogoDuotone className={styles.icon} />
    </div>
  );
};

export default SocialMediaLogoBar;
