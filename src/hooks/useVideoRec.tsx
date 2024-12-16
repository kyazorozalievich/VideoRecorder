"use client";
import { VideoRecContext } from "@/providers/VideoRecProvider";
import { useContext } from "react";

interface IVideoRec {
  status: string;
  startRecording: () => void;
  stopRecording: () => void;
  mediaBlobUrl: string;
}

export const useVideoRec = (): IVideoRec => {
  const context = useContext(VideoRecContext);
  if (!context) {
   throw new Error('Error in useVideoRec')
  };
  return context;
};
