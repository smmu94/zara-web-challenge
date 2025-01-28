import React, { useContext } from "react";
import styles from "./cards.module.sass";
import Image from "next/image";
import { ProductsListContext } from "@contexts/productsListContext";
import { useGetProductList } from "@services/list";
import { useRouter } from "next/router";
import routes from "@utils/routes";

export default function Cards() {
  const router = useRouter();
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

  const goToDetailsView = () => {
    router.push(routes.detail.main);
  };

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.wrapper} data-testid="ListView-Cards">
      {productsList.length &&
        productsList.map((phone, i) => (
          <div
            key={`${phone.id}-${i}`}
            className={styles.card}
            onClick={goToDetailsView}
            data-testid="card"
          >
            <Image
              src={phone.imageUrl}
              alt={phone.name}
              width={329}
              height={257}
              objectFit="contain"
            />
            <div className={styles.info}>
              <h2 className={styles.title}>{phone.brand.toUpperCase()}</h2>
              <span className={styles.description}>
                <p>{phone.name.toUpperCase()}</p>
                <p>{phone.basePrice} EUR</p>
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}
