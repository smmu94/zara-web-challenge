import React from "react";
import { ButtonProps } from "./types";
import styles from "./button.module.sass";

export default function Button({
  style,
  isDisabled = false,
  onClick,
  isExtraHeight = false,
  children,
  ariaLabel = ""
}: ButtonProps) {
  return (
    <button
      className={`
                ${styles.button}
                ${style === "Primary" ? styles.primary : styles.standard}
                ${isExtraHeight ? styles.extraHeight : ""}
                ${isDisabled ? styles.disabled : ""}
            `}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
    >
      {children}
    </button>
  );
}
