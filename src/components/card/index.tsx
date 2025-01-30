import React, { useCallback } from "react";
import styles from "./card.module.sass";
import Image from "next/image";
import routes from "@utils/routes";
import { useRouter } from "next/router";
import { CardProps } from "./types";

export default function Card({ id, imageUrl, name, brand, basePrice }: CardProps) {
  const router = useRouter();
  const goToDetailsView = useCallback((id) => {
    router.push({
      pathname: routes.detail.main,
      query: { id },
    });
  }, []);

  return (
    <div
      className={styles.card}
      onClick={() => goToDetailsView(id)}
      data-testid="card"
    >
      <Image
        src={imageUrl}
        alt={name}
        width={329}
        height={257}
        objectFit="contain"
        priority
      />
      <div className={styles.info}>
        <h2 className={styles.title}>{brand.toUpperCase()}</h2>
        <span className={styles.description}>
          <p>{name.toUpperCase()}</p>
          <p>{basePrice} EUR</p>
        </span>
      </div>
    </div>
  );
}
