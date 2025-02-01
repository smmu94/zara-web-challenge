import React, { useCallback } from "react";
import styles from "./card.module.sass";
import Image from "next/image";
import routes from "@utils/routes";
import { useRouter } from "next/router";
import { CardProps } from "./types";

export default function Card({
  id,
  imageUrl,
  name,
  brand,
  basePrice,
}: CardProps) {
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
      aria-label="product card"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && goToDetailsView(id)}
    >
      <figure className={styles.figure}>
        <Image
          src={imageUrl}
          alt={name}
          objectFit="contain"
          layout="fill"
          priority
        />
      </figure>
      <section className={styles.info}>
        <p className={styles.title}>{brand.toUpperCase()}</p>
        <span className={styles.description}>
          <p>{name.toUpperCase()}</p>
          <p>{basePrice} EUR</p>
        </span>
      </section>
    </div>
  );
}
