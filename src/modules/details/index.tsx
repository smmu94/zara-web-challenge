import routes from "@utils/routes";
import Link from "next/link";
import React from "react";
import styles from "./details.module.sass";
import ProductInfo from "./components/productInfo";
import { useGetProductDetails } from "@services/details";
import { useGetDetailsId } from "./hooks/useGetDetailsId";
import Specifications from "./components/specifications";
import SimilarItems from "./components/similarItems";
import Image from "next/image";

export default function DetailsView() {
  const { id } = useGetDetailsId();
  const { isLoading, isError } = useGetProductDetails(id, {
    enabled: !!id,
  });
  return (
    <section className={styles.wrapper} data-testid="details-view" aria-label="details-view" role="region">
      <Link href={routes.home.main} passHref>
        <a className={styles.back}>
          <Image
            src="/assets/chevron_left.svg"
            alt="back"
            className={styles.icon}
            width={20}
            height={20}
            priority
            aria-label="go back"
          />
          BACK
        </a>
      </Link>
      {isLoading && <div className={styles.loading}>Loading...</div>}
      {isError && <div className={styles.error}>Something went wrong...</div>}
      <section className={styles.content} aria-label="details-content">
        <ProductInfo />
        <Specifications />
        <SimilarItems />
      </section>
    </section>
  );
}
