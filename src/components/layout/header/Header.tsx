"use client";
import Link from "next/link";
import scss from "./Header.module.scss";
import { GiVideoCamera } from "react-icons/gi";
import { SiGoogledisplayandvideo360 } from "react-icons/si";

const Header = () => {
  return (
    <section className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <Link href="/">
            <GiVideoCamera />
          </Link>
          <h3>
            Video Recorder
            <span>
              <SiGoogledisplayandvideo360 />
            </span>
          </h3>
          <h1></h1>
        </div>
      </div>
    </section>
  );
};

export default Header;
