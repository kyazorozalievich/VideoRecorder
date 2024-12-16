'use client'
import { VideoRecContext } from "@/providers/VideoRecProvider";
import { useContext } from "react";

interface IVideoRec {
  status: string;
  startRecording: () => void;
  stopRecording: () => void;
  mediaBlobUrl: string | null;  // Изменено на string | null
}

export const useVideoRec = (): IVideoRec => {
  if (typeof window === "undefined") {
    return { status: "Server", startRecording: () => {}, stopRecording: () => {}, mediaBlobUrl: null }; // null для mediaBlobUrl
  }
  const context = useContext(VideoRecContext);
  if (!context) {
    throw new Error('Error in useVideoRec');
  }
  return context;
};
