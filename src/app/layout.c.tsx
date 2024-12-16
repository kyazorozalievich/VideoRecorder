import VideoRecProvider from "@/providers/VideoRecProvider";
import { FC, ReactNode } from "react";

interface IlayoutClient {
  children: ReactNode;
}

const LayoutClient: FC<IlayoutClient> = ({ children }) => {
  return <VideoRecProvider>{children}</VideoRecProvider>;
};

export default LayoutClient;
