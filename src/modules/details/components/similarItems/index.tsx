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
    <article className={styles.wrapper} data-testid="detailsView-similarItems">
      <p className={styles.title} id="similar-items">
        SIMILAR ITEMS
      </p>
      <ul className={styles.carrousel} aria-labelledby="similar-items">
        {product.similarProducts.map((item, i) => (
          <li key={`${item.id}-${i}`}>
            <Card
              basePrice={item.basePrice}
              brand={item.brand}
              id={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
            />
          </li>
        ))}
      </ul>
    </article>
  );
}
