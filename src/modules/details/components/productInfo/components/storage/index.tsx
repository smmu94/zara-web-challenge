import React from "react";
import { StorageProps } from "./types";
import styles from "./storage.module.sass";

export default function Storage({
  storage,
  isSelected,
  onClick,
  id
}: StorageProps) {
  return (
    <button
      className={`${styles.wrapper} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
      id={id}
      data-testid="productInfo-storage"
      aria-label="product-storage"
    >
      {storage}
    </button>
  );
}
