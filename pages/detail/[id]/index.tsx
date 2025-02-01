import DetailsView from "@modules/details";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Detail: NextPage = () => {
  return (
    <>
      <Head>
        <title>Details</title>
        <meta name="description" content="Details page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DetailsView />
    </>
  );
};

export default Detail;
