import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import routes from "@utils/routes";
import styles from "./navbar.module.sass";
import { SelectedProductsContext } from "@contexts/selectedProductsContext";
import Image from "next/image";

export default function Navbar() {
  const { selectedProducts } = useContext(SelectedProductsContext);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <nav className={styles.wrapper} aria-label="main navigation">
      <Link
        href={{
          pathname: routes.home.main,
        }}
        passHref
      >
        <a className={styles.logo}>
          <Image
            src="/assets/logo.svg"
            width={74}
            height={24}
            alt="logo"
            priority
          />
        </a>
      </Link>
      <Link
        href={{
          pathname: routes.cart.main,
        }}
        passHref
      >
        <a className={styles.link}>
          <Image
            src={`/assets/${!!selectedProducts.length ? "bag_solid" : "bag"}.svg`}
            width={28}
            height={28}
            alt={!!selectedProducts.length ? "bag_solid" : "bag"}
          />
          <p className={styles.text} aria-live="polite">
            {selectedProducts.length}
          </p>
        </a>
      </Link>
    </nav>
  );
}
