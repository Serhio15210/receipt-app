import { Link } from "@tanstack/react-router";
import styles from "./layout.module.scss";
import React from "react";
import { useStore } from "@/zustand/store.ts";
type LayoutProp = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProp) => {
  const cart = useStore((state) => state.cart);
  return (
    <>
      <header className={styles.layoutHeader}>
        <Link to={"/"}>
          <img src={"/logo.png"} alt={"logo"} />
        </Link>
        <div className={styles.navRow}>
          <Link
            to={"/"}
            className={styles.link}
            activeProps={{ className: styles.active }}
          >
            Home
          </Link>
          <Link
            to={"/cart"}
            className={styles.link}
            activeProps={{ className: styles.active }}
          >
            {`Receipt Cart ${cart.length && `(${cart.length})`}`}
          </Link>
        </div>
      </header>
      {children}
    </>
  );
};

export default Layout;
