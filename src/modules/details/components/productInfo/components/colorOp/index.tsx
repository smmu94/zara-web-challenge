import React from "react";
import styles from "./colorOp.module.sass";
import { ColorOpProps } from "./types";

export default function ColorOp({ color, isSelected, onClick, id }: ColorOpProps) {
  return (
    <div
      className={`${styles.wrapper} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
      id={id}
    >
      <div
        style={{ backgroundColor: color.hexCode }}
        className={styles.color}
      />
    </div>
  );
}
