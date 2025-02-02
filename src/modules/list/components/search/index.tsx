import React, { useCallback, useContext, useState } from "react";
import styles from "./search.module.sass";
import { ProductsListContext } from "@contexts/productsListContext";
import { debounce } from "underscore";

export default function Search() {
  const { setSearch, search, productsList } = useContext(ProductsListContext);
  const [inputValue, setInputValue] = useState(search);
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 500),
    [setSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  return (
    <section className={styles.wrapper} data-testid="ListView-Search" aria-label="list-view-search">
      <label htmlFor="search-input" aria-label="search-input"/>
      <input
        id="search-input"
        type="search"
        placeholder="Search for a smartphone..."
        value={inputValue}
        onChange={handleChange}
      />
      <p className={styles.count} aria-live="polite">{productsList.length} RESULTS</p>
    </section>
  );
}
