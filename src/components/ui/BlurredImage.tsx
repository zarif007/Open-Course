/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Skeleton } from "./Skeleton";

const BlurredImage = ({
  src,
  alt,
  className,
  dimension,
}: {
  src: string;
  alt: string;
  className: string;
  dimension: string;
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
      {!loaded && <Skeleton className={dimension} />}
    </div>
  );
};

export default BlurredImage;
