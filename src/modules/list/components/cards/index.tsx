import React from "react";
import styles from "./cards.module.sass";
import { useGetProductList } from "@services/list";
import Image from "next/image";

export default function Cards() {
  const { data } = useGetProductList({ limit: 20, offset: 0, search: "" });
  console.log(data);
  return (
    <div className={styles.wrapper}>
      {data?.map((phone) => (
        <div key={phone.id} className={styles.card}>
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
