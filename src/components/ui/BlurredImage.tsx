/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Skeleton } from "./Skeleton";

const BlurredImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div>
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        className={`${className} ${loaded ? "flex" : "hidden"}`}
      />
      {!loaded && <Skeleton className="lg:h-48 md:h-36 w-full h-48" />}
    </div>
  );
};

export default BlurredImage;
