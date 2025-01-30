import React from "react";
import styles from "./similarItems.module.sass";
import { useGetQueryDetails } from "@modules/details/hooks/useGetQueryDetails";
import Card from "@components/card";

export default function SimilarItems() {
  const { product } = useGetQueryDetails();
  if (!product) {
    return null;
  }

  return (
    <div className={styles.wrapper} data-testid="detailsView-similarItems">
      <p className={styles.title}>SIMILAR ITEMS</p>
      <div className={styles.carrousel}>
        {product.similarProducts.map((item) => (
          <Card
            key={item.id}
            basePrice={item.basePrice}
            brand={item.brand}
            id={item.id}
            imageUrl={item.imageUrl}
            name={item.name}
          />
        ))}
      </div>
    </div>
  );
}
