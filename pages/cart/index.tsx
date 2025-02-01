import CartView from "@modules/cart";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Cart: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Cart page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CartView />
    </>
  );
};

export default Cart;
