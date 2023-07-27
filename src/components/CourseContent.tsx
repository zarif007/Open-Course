import { ICourseTopic } from "@/types/courseTopic";
import React, { useEffect, useState } from "react";
import LargeHeading from "./ui/LargeHeading";
import Embed from "react-embed";

function isYouTubeURL(url: string) {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/i;
  const youtubeShortRegex =
    /^(https?:\/\/)?(www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/i;
  return youtubeRegex.test(url) || youtubeShortRegex.test(url);
}

function getYouTubeEmbedLink(videoID: string) {
  // Placeholder logic for YouTube embedding
  return `https://www.youtube.com/embed/${videoID}`;
}

function getFacebookEmbedLink(url: string) {
  // Placeholder logic for Facebook embedding
  return `https://www.facebook.com/embed?url=${encodeURIComponent(url)}`;
}

function getGitHubEmbedLink(url: string) {
  // Placeholder logic for GitHub embedding
  return `https://www.github.com/embed?url=${encodeURIComponent(url)}`;
}

function getInstagramEmbedLink(url: string) {
  // Placeholder logic for Instagram embedding
  return `https://www.instagram.com/embed?url=${encodeURIComponent(url)}`;
}

function getLinkedInEmbedLink(url: string) {
  // Placeholder logic for LinkedIn embedding
  return `https://www.linkedin.com/embed?url=${encodeURIComponent(url)}`;
}

function getTwitterEmbedLink(url: string) {
  // Placeholder logic for Twitter embedding
  return `https://www.twitter.com/embed?url=${encodeURIComponent(url)}`;
}

function getTwitchEmbedLink(url: string) {
  // Placeholder logic for Twitch embedding
  return `https://www.twitch.tv/embed?url=${encodeURIComponent(url)}`;
}

function getGoogleMapsEmbedLink(url: string) {
  // Placeholder logic for Google Maps embedding
  return `https://www.google.com/maps/embed?url=${encodeURIComponent(url)}`;
}

function getYouTubeVideoID(url: string) {
  const videoIDRegex =
    /(?:\?v=|\/embed\/|\/v\/|youtu\.be\/|\/watch\?v=)([a-zA-Z0-9_-]{11})/;
  const match = url.match(videoIDRegex);

  return match ? match[1] : "";
}

function getEmbeddableLink(url: string) {
  const domain = new URL(url).hostname.toLowerCase().slice(4);

  console.log(domain);
  switch (domain) {
    case "youtube.com":
    case "u.be":
      return isYouTubeURL(url)
        ? getYouTubeEmbedLink(getYouTubeVideoID(url))
        : url;
    case "facebook.com":
      return getFacebookEmbedLink(url);
    case "github.com":
      return getGitHubEmbedLink(url);
    case "instagram.com":
      return getInstagramEmbedLink(url);
    case "linkedin.com":
      return getLinkedInEmbedLink(url);
    case "twitter.com":
      return getTwitterEmbedLink(url);
    case "twitch.tv":
      return getTwitchEmbedLink(url);
    case "google.com":
      return url.includes("maps") ? getGoogleMapsEmbedLink(url) : url;
    default:
      return url;
  }
}

const CourseContent = ({ courseTopic }: { courseTopic: ICourseTopic }) => {
  const [urlStatus, setUrlStatus] = useState<
    "loading" | "available" | "unavailable"
  >("available");

  return (
    <div className="mx-4" style={{ width: "100%", height: "100vh" }}>
      <LargeHeading
        size="sm"
        onClick={() => console.log(getEmbeddableLink(courseTopic.url))}
      >
        {courseTopic.title}
      </LargeHeading>
      {urlStatus === "loading" ? (
        <p>Loading...</p>
      ) : urlStatus === "available" ? (
        <Embed url={courseTopic.url} />
      ) : (
        <p>{courseTopic.url}</p>
      )}
    </div>
  );
};

export default CourseContent;
