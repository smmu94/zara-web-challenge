import React from "react";
import styles from "./search.module.sass";

export default function Search() {
  return (
    <div className={styles.wrapper}>
      <input type="text" placeholder="Search for a smartphone..." />
      <p className={styles.count}>20 RESULTS</p>
    </div>
  );
}
