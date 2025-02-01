import React, { useContext } from "react";
import styles from "./productInfo.module.sass";
import Storage from "./components/storage";
import ColorOp from "./components/colorOp";
import Button from "@components/button";
import { Controller, useForm } from "react-hook-form";
import { FormData, initialValues } from "./form";
import { SelectedProductsContext } from "@contexts/selectedProductsContext";
import { useRouter } from "next/router";
import routes from "@utils/routes";
import { useGetQueryDetails } from "@modules/details/hooks/useGetQueryDetails";

export default function ProductInfo() {
  const router = useRouter();
  const { setSelectedProducts } = useContext(SelectedProductsContext);
  const { product } = useGetQueryDetails();

  const { setValue, watch, control } = useForm<FormData>({
    defaultValues: initialValues,
  });

  const imageUrl = watch("color").imageUrl;
  const enabledButton = !!watch("color").name && !!watch("storage").capacity;
  const storage = watch("storage");

  if (!product) {
    return null;
  }
  const defaultImage = product.colorOptions[0].imageUrl;

  const addToCart = () => {
    const newProduct = {
      ...watch(),
      id: `${product.id}-${watch("color").name}-${storage}`,
      name: product.name,
    };
    setSelectedProducts((prev) => [...prev, newProduct]);
    router.push(routes.cart.main);
  };

  return (
    <div className={styles.wrapper} data-testid="detailsView-productInfo">
      <img
        className={styles.image}
        src={imageUrl || defaultImage}
        alt={product.name}
      />
      <div className={styles.info}>
        <span className={styles.title}>
          <p className={styles.name}>{product.name.toUpperCase()}</p>
          <p className={styles.priceFrom}>
            {!storage.price ? `From ${product.basePrice}` : storage.price} EUR
          </p>
        </span>
        <div className={styles.selectors}>
          <Controller
            name="storage"
            control={control}
            render={({ field }) => (
              <div className={styles.storage} data-testid="storage">
                <label htmlFor="storage" className={styles.label}>
                  STORAGE ¿HOW MUCH SPACE DO YOU NEED?
                </label>
                <div className={styles.options}>
                  {product.storageOptions.map((storage) => (
                    <Storage
                      key={storage.capacity}
                      id={`storage-${storage.capacity}`}
                      storage={storage.capacity}
                      isSelected={field.value.capacity === storage.capacity}
                      onClick={() => setValue("storage", storage)}
                    />
                  ))}
                </div>
              </div>
            )}
          />
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <div className={styles.colorOp} data-testid="color">
                <label htmlFor="color" className={styles.label}>
                  COLOR. PICK YOUR FAVOURITE.
                </label>
                <div className={styles.containerOp}>
                  <div className={styles.options}>
                    {product.colorOptions.map((colorOp) => (
                      <ColorOp
                        key={colorOp.name}
                        id={`color-${colorOp.name}`}
                        color={colorOp.hexCode}
                        isSelected={field.value.name === colorOp.name}
                        onClick={() => setValue("color", colorOp)}
                      />
                    ))}
                  </div>
                  {!!field.value.name && (
                    <p className={styles.colorName}>{field.value.name}</p>
                  )}
                </div>
              </div>
            )}
          />
        </div>
        <Button onClick={addToCart} style="Primary" isDisabled={!enabledButton}>
          AÑADIR
        </Button>
      </div>
    </div>
  );
}
