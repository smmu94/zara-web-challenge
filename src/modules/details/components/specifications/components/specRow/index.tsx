import React from "react";
import styles from "./specRow.module.sass";
import { SpecRowProps } from "./types";

export default function SpecRow({
  title,
  description,
  isFirst = false,
}: SpecRowProps) {
  return (
    <div
      className={`${styles.wrapper} ${isFirst && styles.first}`}
      data-testid="spect-row"
    >
      <p className={styles.cell}>{title.toUpperCase()}</p>
      <p className={styles.cell}>{description}</p>
    </div>
  );
}
