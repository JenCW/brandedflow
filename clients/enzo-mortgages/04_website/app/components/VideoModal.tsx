"use client";

import { X, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

export function VideoModal({ isOpen, onClose, videoSrc }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Force video to reload when videoSrc changes or modal opens
  useEffect(() => {
    if (!isOpen || !videoSrc) return;
    
    const video = videoRef.current;
    if (!video) return;
    
    // Reset and load video when modal opens or source changes
    const loadAndPlay = () => {
      video.currentTime = 0;
      video.load();
      
      // Wait for video to be ready, then play
      const tryPlay = () => {
        if (video.readyState >= 2) { // HAVE_CURRENT_DATA or higher
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log("Video playing successfully");
              })
              .catch((error) => {
                console.error("Video autoplay failed:", error);
                // User can click play button on controls
              });
          }
        } else {
          // Wait a bit more for video to load
          setTimeout(tryPlay, 100);
        }
      };
      
      // Start trying to play after a short delay
      setTimeout(tryPlay, 200);
    };
    
    // Small delay to ensure video element is fully mounted
    const timer = setTimeout(loadAndPlay, 100);
    
    return () => clearTimeout(timer);
  }, [isOpen, videoSrc]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      data-testid="modal-video-overlay"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-white hover:text-primary transition-colors z-10"
        data-testid="button-close-video"
        aria-label="Close video"
      >
        <X className="w-8 h-8" />
      </button>
      
      <div 
        className="relative w-full max-w-7xl mx-4 aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          key={videoSrc}
          autoPlay
          muted
          controls
          playsInline
          preload="auto"
          className="w-full h-full rounded-3xl shadow-2xl border-2 border-white/10"
          data-testid="video-player"
          onLoadedMetadata={() => {
            console.log("Video metadata loaded:", videoSrc);
          }}
          onLoadedData={() => {
            // Video data loaded, try to play
            if (videoRef.current) {
              videoRef.current.play().catch((error) => {
                console.error("Video play failed after load:", error);
              });
            }
          }}
          onCanPlay={() => {
            // Video is ready to play
            if (videoRef.current) {
              videoRef.current.play().catch((error) => {
                console.error("Video play failed on canPlay:", error);
              });
            }
          }}
          onError={(e) => {
            console.error("Video failed to load:", videoSrc);
            console.error("Video error details:", e);
            const target = e.target as HTMLVideoElement;
            if (target.error) {
              console.error("Video error code:", target.error.code);
              console.error("Video error message:", target.error.message);
            }
            target.style.display = "none";
            const errorDiv = target.parentElement?.querySelector(".video-error");
            if (errorDiv) {
              (errorDiv as HTMLElement).style.display = "flex";
            }
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc.replace(/\.mov$/i, ".mp4")} type="video/mp4" />
          <source src={videoSrc.replace(/\.MOV$/i, ".mp4")} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-error hidden absolute inset-0 bg-zinc-900 rounded-3xl items-center justify-center flex-col gap-4 text-white">
          <p className="text-xl font-semibold">Video unavailable</p>
          <p className="text-zinc-400 text-sm">The video file could not be loaded.</p>
          <p className="text-zinc-500 text-xs mt-2">Path: {videoSrc}</p>
          <button
            onClick={onClose}
            className="btn-luxury"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

interface VideoButtonProps {
  onClick: () => void;
  className?: string;
}

export function VideoButton({ onClick, className = "" }: VideoButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-8 py-4 bg-primary border border-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors ${className}`}
      data-testid="button-watch-video"
    >
      <Play className="w-5 h-5" />
      Learn More
    </button>
  );
}
