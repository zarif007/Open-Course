import { useState } from 'react';

const BlurredImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div className={`image-container ${loaded ? 'loaded' : 'loading'}`}>
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        className={`image ${loaded ? 'loaded' : 'loading'}`}
      />
      {!loaded && <div className="placeholder" />}
      <style jsx>{`
        .image-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .image {
          object-fit: cover;
          width: 100%;
          height: 100%;
          filter: blur(10px);
          transition: filter 0.3s ease-in-out;
        }

        .loaded {
          filter: blur(0);
        }

        .loading::after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
        }

        .placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #f0f0f0; /* Color of the placeholder */
        }
      `}</style>
    </div>
  );
};

export default BlurredImage;
