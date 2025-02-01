import React from "react";
import styles from "./specifications.module.sass";
import { useGetQueryDetails } from "@modules/details/hooks/useGetQueryDetails";
import SpecRow from "./components/specRow";
import { getSpecContent } from "./utils";

export default function Specifications() {
  const { product } = useGetQueryDetails();
  if (!product) {
    return null;
  }
  const spectContent = getSpecContent(product);
  return (
    <article className={styles.wrapper} data-testid="detailsView-specifications">
      <p className={styles.title}>SPECIFICATIONS</p>
      <section className={styles.content}>
        {spectContent.map((spec, i) => (
          <SpecRow
            key={spec.title}
            title={spec.title}
            description={spec.description}
            isFirst={i === 0}
          />
        ))}
      </section>
    </article>
  );
}
