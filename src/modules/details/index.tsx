import routes from "@utils/routes";
import Link from "next/link";
import React from "react";
import styles from "./details.module.sass";
import { FaChevronLeft } from "react-icons/fa6";
import ProductInfo from "./components/productInfo";
import { useGetProductDetails } from "@services/details";
import { useGetDetailsId } from "./hooks/useGetDetailsId";
import Specifications from "./components/specifications";
import SimilarItems from "./components/similarItems";

export default function DetailsView() {
  const { id } = useGetDetailsId();
  const { isLoading, isError } = useGetProductDetails(id, {
    enabled: !!id,
  });
  return (
    <div className={styles.wrapper} data-testid="details-view">
      <Link href={routes.home.main} passHref>
        <a className={styles.back}>
          <div className={styles.icon}>
            <FaChevronLeft />
          </div>
          BACK
        </a>
      </Link>
      {isLoading && <div className={styles.loading}>Loading...</div>}
      {isError && <div className={styles.error}>Something went wrong...</div>}
      <div className={styles.content}>
        <ProductInfo />
        <Specifications />
        <SimilarItems />
      </div>
    </div>
  );
}
