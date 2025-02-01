import React, { useState, useEffect, useContext } from "react";
import styles from "./payResume.module.sass";
import { SelectedProductsContext } from "@contexts/selectedProductsContext";
import Button from "@components/button";
import { noop } from "underscore";
import { useRouter } from "next/router";
import routes from "@utils/routes";

export default function PayResume() {
  const router = useRouter();
  const { selectedProducts } = useContext(SelectedProductsContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 834);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const getTotal = () => {
    return selectedProducts.reduce(
      (acc, product) => acc + product.storage.price,
      0
    );
  };

  const goToListView = () => {
    router.push(routes.home.main);
  };

  const renderTotal = () => (
    <div className={styles.total}>
      <p>TOTAL</p>
      <p>{getTotal()} EUR</p>
    </div>
  );

  const renderButtons = () => (
    <nav className={styles.actions}>
      <Button onClick={goToListView} style="Standard">
        CONTINUE SHOPPING
      </Button>
      {!!selectedProducts.length && (
        <Button onClick={noop} style="Primary">
          PAY
        </Button>
      )}
    </nav>
  );

  return (
    <section className={styles.wrapper} data-testid="payResume" aria-label="pay-resume">
      {isMobile ? (
        <>
          {!!selectedProducts.length && renderTotal()}
          {renderButtons()}
        </>
      ) : (
        <>
          <div className={styles.continue}>
            <Button onClick={goToListView} style="Standard" ariaLabel="continue-shopping">
              CONTINUE SHOPPING
            </Button>
          </div>
          {!!selectedProducts.length && (
            <div className={styles.pay}>
              {renderTotal()}
              <Button onClick={noop} style="Primary" ariaLabel="pay">
                PAY
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
