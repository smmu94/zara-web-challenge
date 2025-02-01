import React, { useContext } from "react";
import Link from "next/link";
import routes from "@utils/routes";
import styles from "./navbar.module.sass";
import Image from "next/image";
import { SelectedProductsContext } from "@contexts/selectedProductsContext";

export default function Navbar() {
  const { selectedProducts } = useContext(SelectedProductsContext);
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
          <Image
            src={`/assets/${!!selectedProducts.length ? "bag_solid" : "bag"}.svg`}
            width={28}
            height={28}
            alt={!!selectedProducts.length ? "bag_solid" : "bag"}
          />
          <p className={styles.text}>{selectedProducts.length}</p>
        </a>
      </Link>
    </nav>
  );
}
