"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const getFileExtension = (url: string): string => {
  return url.split(".").pop()?.toLowerCase() || "";
};

const isVideo = (extension: string): boolean => {
  const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi", "m4v"];
  return videoExtensions.includes(extension);
};

const VideoWithPlaceholder = ({
  src,
  className,
  placeholder,
}: {
  src: string;
  className?: string;
  placeholder?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const video = videoRef.current;
    if (video) {
      observer.observe(video);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && !placeholder) {
      console.warn("No placeholder provided for video");
    }
  }, [placeholder]);

  useEffect(() => {
    const video = videoRef.current;
    
    if (video && isInView) {
      const handleLoadedData = () => {
        setVideoLoaded(true);
        setHasError(false);
      };
      
      const handleCanPlay = () => {
        setVideoLoaded(true);
        setHasError(false);
      };

      const handleError = () => {
        setHasError(true);
        setVideoLoaded(false);
      };

      const handleLoadStart = () => {
        setHasError(false);
      };

      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("error", handleError);
      video.addEventListener("loadstart", handleLoadStart);
      
      // Reduce quality for better performance
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      
      // Start loading only when in view
      video.load();
      
      if (video.readyState >= 2) {
        setVideoLoaded(true);
      }
      
      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("error", handleError);
        video.removeEventListener("loadstart", handleLoadStart);
      };
    }
  }, [src, isInView]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && videoLoaded && !hasError) {
      // Use requestAnimationFrame for smoother playback
      requestAnimationFrame(() => {
        video.play().catch(console.error);
      });
    }
  }, [videoLoaded, hasError]);

  return (
    <>
      {placeholder && (
        <Image
          src={placeholder}
          loading="eager"
          priority
          sizes="100vw"
          alt="Background"
          className={cn(className, { 
            "opacity-0": videoLoaded && !hasError,
            "opacity-100": !videoLoaded || hasError 
          }, "transition-opacity duration-500")}
          quality={85}
          fill
        />
      )}
      {!hasError && isInView && (
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          loop
          controls={false}
          preload="none"
          disablePictureInPicture
          disableRemotePlayback
          className={cn(className, { 
            "opacity-100": videoLoaded && !hasError,
            "opacity-0": !videoLoaded || hasError 
          }, "transition-opacity duration-500")}
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            perspective: '1000px'
          }}
        />
      )}
    </>
  );
};

export const Background = ({
  src,
  placeholder,
}: {
  src: string;
  placeholder?: string;
}) => {
  const extension = getFileExtension(src);
  const isVideoFile = isVideo(extension);

  console.log(isVideoFile)
  const classNames =
    "absolute bg-background left-0 top-0 w-full h-full object-cover rounded-[42px] md:rounded-[72px] will-change-transform";

  if (isVideoFile) {
    return (
      <VideoWithPlaceholder
        src={src}
        className={classNames}
        placeholder={placeholder}
      />
    );
  }

  return (
    <Image
      priority
      loading="eager"
      src={src}
      alt="Background"
      className={classNames}
      sizes="100vw"
      fill
    />
  );
};
