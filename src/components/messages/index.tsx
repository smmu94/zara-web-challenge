import React from "react";
import { MessagesProps } from "./types";
import styles from "./messages.module.sass";

export default function Messages({ message, isError = false }: MessagesProps) {
  return (
    <div className={`${styles.wrapper} ${isError && styles.error}`} role="contentinfo">
      {message}
    </div>
  );
}
