import React, { useCallback, useContext, useState } from "react";
import styles from "./search.module.sass";
import { ProductsListContext } from "src/contexts/productsListContext";
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
    <div className={styles.wrapper}>
      <input
        type="search"
        placeholder="Search for a smartphone..."
        value={inputValue}
        onChange={handleChange}
      />
      <p className={styles.count}>{productsList.length} RESULTS</p>
    </div>
  );
}
