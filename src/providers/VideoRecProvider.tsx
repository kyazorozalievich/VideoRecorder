"use client";
import { createContext, FC, ReactNode } from "react";
import scss from "./VideoRecProvider.module.scss";
import { useReactMediaRecorder } from "react-media-recorder";

interface IChild {
    children: ReactNode
}

interface IVideoRec {
  status: string;
  startRecording: () => void;
  stopRecording: () => void;
  mediaBlobUrl: string;
}

export const VideoRecContext = createContext<IVideoRec | undefined>(undefined);

const VideoRecProvider: FC<IChild> = ({children}) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ screen: true, video: false });
  return (
    <VideoRecContext.Provider
      value={{
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl: mediaBlobUrl!,
      }}
    >
    {children}
    </VideoRecContext.Provider>
  );
};

export default VideoRecProvider;
