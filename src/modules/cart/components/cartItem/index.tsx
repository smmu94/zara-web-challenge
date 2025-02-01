import React, { useContext } from "react";
import styles from "./cartItem.module.sass";
import { CartItemProps } from "./types";
import { SelectedProductsContext } from "@contexts/selectedProductsContext";
import Image from "next/image";

export default function CartItem({ color, id, storage, name }: CartItemProps) {
  const { setSelectedProducts } = useContext(SelectedProductsContext);
  const handleDelete = () => {
    setSelectedProducts((prev) => prev.filter((product) => product.id !== id));
  };
  return (
    <article
      className={styles.wrapper}
      data-testid="cart-item"
      aria-label="cart-item"
    >
      <figure className={styles.figure}>
        <Image
          src={color.imageUrl}
          alt={`${name} ${color.name}`}
          priority
          objectFit="contain"
          layout="fill"
        />
      </figure>
      <section className={styles.details}>
        <div className={styles.info}>
          <div className={styles.text}>
            <p>{name.toUpperCase()}</p>
            <p>
              {storage.capacity} | {color.name.toUpperCase()}
            </p>
          </div>
          <div className={styles.price}>{storage.price} EUR</div>
        </div>
        <button
          onClick={handleDelete}
          className={styles.delete}
          aria-label="delete-button"
        >
          Eliminar
        </button>
      </section>
    </article>
  );
}
