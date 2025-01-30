import React, { useContext } from "react";
import styles from "./cart.module.sass";
import { SelectedProductsContext } from "@contexts/selectedProductsContext";
import CartItem from "./components/cartItem";
import PayResume from "./components/payResume";

export default function CartView() {
  const { selectedProducts } = useContext(SelectedProductsContext);
  return (
    <div className={styles.wrapper} data-testid="cart-view">
      <div className={styles.items}>
        <p className={styles.title}>CART {`(${selectedProducts.length})`}</p>
        <div className={styles.products}>
          {selectedProducts.map((product) => (
            <div key={product.id} className={styles.item}>
              <CartItem {...product} />
            </div>
          ))}
        </div>
      </div>
      <footer>
        <PayResume />
      </footer>
    </div>
  );
}
