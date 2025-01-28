import React from "react";
import styles from "./list.module.sass";
import Cards from "./components/cards";
import Search from "./components/search";

export default function ListView() {
  return (
    <div className={styles.wrapper} data-testid="list-view">
      <Search />
      <Cards />
    </div>
  );
}
