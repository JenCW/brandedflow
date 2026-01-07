"use client";

import { X, Play } from "lucide-react";
import { useState, useEffect } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

export function VideoModal({ isOpen, onClose, videoSrc }: VideoModalProps) {
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
        className="relative w-full max-w-5xl mx-4 aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          autoPlay
          controls
          playsInline
          className="w-full h-full rounded-lg shadow-2xl"
          data-testid="video-player"
          onError={(e) => {
            console.error("Video failed to load:", videoSrc);
            const target = e.target as HTMLVideoElement;
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
        <div className="video-error hidden absolute inset-0 bg-zinc-900 rounded-lg items-center justify-center flex-col gap-4 text-white">
          <p className="text-xl font-semibold">Video unavailable</p>
          <p className="text-zinc-400 text-sm">The video file could not be loaded.</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
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
      className={`group inline-flex flex-col items-center gap-4 p-6 rounded-lg bg-zinc-900/50 border border-zinc-700 hover:border-primary hover:bg-zinc-900/80 transition-all ${className}`}
      data-testid="button-watch-video"
    >
      <span className="relative flex items-center justify-center w-20 h-20 rounded-full bg-primary border-4 border-primary/50 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
        <Play className="w-10 h-10 text-primary-foreground fill-primary-foreground ml-1" />
        <span className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-30" />
      </span>
      <span className="text-white text-lg font-bold uppercase tracking-widest group-hover:text-primary transition-colors">
        Watch Video
      </span>
      <span className="text-zinc-400 text-sm">See how we help homeowners like you</span>
    </button>
  );
}
