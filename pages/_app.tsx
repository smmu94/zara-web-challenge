import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "src/components/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductsListProvider } from "src/contexts/productsListContext";
import { SelectedProductsProvider } from "@contexts/selectedProductsContext";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SelectedProductsProvider>
        <ProductsListProvider>
          <main role="main" aria-labelledby="main-content">
            <Navbar />
            <div className="container">
              <Component {...pageProps} />
            </div>
          </main>
        </ProductsListProvider>
      </SelectedProductsProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
