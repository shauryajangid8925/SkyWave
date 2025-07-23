import React from 'react';

const BackgroundVideo = () => {
  return (
    <div className="fixed inset-0 z-0">
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/my-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Smooth fade when video restarts using a black overlay with animation */}
      <div className="absolute inset-0 bg-black opacity-10 transition-opacity duration-1000 pointer-events-none"></div>
    </div>
  );
};

export default BackgroundVideo;
