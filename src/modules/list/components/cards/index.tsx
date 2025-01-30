import React, { useContext } from "react";
import styles from "./cards.module.sass";
import { ProductsListContext } from "@contexts/productsListContext";
import { useGetProductList } from "@services/list";
import Card from "@components/card";

export default function Cards() {
  const { search, setProductsList, productsList } =
    useContext(ProductsListContext);

  const { isError, isLoading } = useGetProductList(
    { search, limit: 20, offset: 0 },
    {
      onSuccess: (data) => {
        setProductsList(data);
      },
    }
  );

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!productsList.length) {
    return <div>No results found</div>;
  }

  return (
    <div className={styles.wrapper} data-testid="ListView-Cards">
      {!!productsList.length &&
        productsList.map((phone) => (
          <Card
            key={phone.id}
            id={phone.id}
            imageUrl={phone.imageUrl}
            name={phone.name}
            brand={phone.brand}
            basePrice={phone.basePrice}
          />
        ))}
    </div>
  );
}
