import React from "react";
import styles from "./colorOp.module.sass";
import { ColorOpProps } from "./types";

export default function ColorOp({ color, isSelected, onClick, id }: ColorOpProps) {
  return (
    <button
      className={`${styles.wrapper} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
      id={id}
      data-testid="productInfo-colorOp"
      aria-label="product-color"
    >
      <span
        style={{ backgroundColor: color }}
        className={styles.color}
      />
    </button>
  );
}
