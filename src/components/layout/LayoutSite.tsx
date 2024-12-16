import { FC, ReactNode } from "react";
import Header from "./header/Header";
import scss from "./LayoutSite.module.scss";

interface ILayoutSite {
  children: ReactNode;
}

const LayoutSite: FC<ILayoutSite> = ({ children }) => {
  return (
    <div className={scss.layout}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default LayoutSite;
