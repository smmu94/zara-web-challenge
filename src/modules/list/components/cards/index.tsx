import React, { useContext } from "react";
import styles from "./cards.module.sass";
import { ProductsListContext } from "@contexts/productsListContext";
import { useGetProductList } from "@services/list";
import Card from "@components/card";
import Messages from "@components/messages";
import { messages } from "./constants";

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
    return <Messages message={messages.error} isError />;
  }

  if (isLoading) {
    return <Messages message={messages.loading} />;
  }

  if (!productsList.length) {
    return <Messages message={messages.empty} />;
  }

  return (
    <section className={styles.wrapper} data-testid="ListView-Cards" aria-label="list-view-cards" role="list">
      {!!productsList.length &&
        productsList.map((phone, i) => (
          <Card
            key={`${phone.id}-${i}`}
            id={phone.id}
            imageUrl={phone.imageUrl}
            name={phone.name}
            brand={phone.brand}
            basePrice={phone.basePrice}
          />
        ))}
    </section>
  );
}
