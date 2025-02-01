import React, { useContext } from "react";
import styles from "./cart.module.sass";
import { SelectedProductsContext } from "@contexts/selectedProductsContext";
import CartItem from "./components/cartItem";
import PayResume from "./components/payResume";

export default function CartView() {
  const { selectedProducts } = useContext(SelectedProductsContext);
  return (
    <section className={styles.wrapper} data-testid="cart-view">
      <div className={styles.items}>
        <p className={styles.title} id="card-title">
          CART ({selectedProducts.length})
        </p>
        <ul className={styles.products} aria-labelledby="card-title">
          {selectedProducts.map((product) => (
            <li key={product.id} className={styles.item}>
              <CartItem {...product} />
            </li>
          ))}
        </ul>
      </div>
      <footer>
        <PayResume />
      </footer>
    </section>
  );
}
