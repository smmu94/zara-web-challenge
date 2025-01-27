import React, { useContext } from "react";
import styles from "./cards.module.sass";
import Image from "next/image";
import { ProductsListContext } from "src/contexts/productsListContext";
import { useGetProductList } from "@services/list";
import { useRouter } from "next/router";
import routes from "@utils/routes";

export default function Cards() {
  const router = useRouter();
  const { search, setProductsList, productsList } = useContext(ProductsListContext);

  useGetProductList(
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

  return (
    <div className={styles.wrapper}>
      {productsList.length && productsList.map((phone, i) => (
        <div key={`${phone.id}-${i}`} className={styles.card} onClick={goToDetailsView}>
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
