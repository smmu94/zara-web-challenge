import React from "react";
import Link from "next/link";
import routes from "@utils/routes";
import styles from "./navbar.module.sass";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className={styles.wrapper}>
      <Link
        href={{
          pathname: routes.home.main,
        }}
      >
        <a>
          <Image
            src="/assets/logo.svg"
            width={74}
            height={24}
            alt="logo"
            className={styles.logo}
          />
        </a>
      </Link>
      <Link
        href={{
          pathname: routes.cart.main,
        }}
      >
        <a className={styles.link}>
          <Image src="/assets/cart.svg" width={28} height={28} alt="cart" />
          <p className={styles.text}>0</p>
        </a>
      </Link>
    </nav>
  );
}
