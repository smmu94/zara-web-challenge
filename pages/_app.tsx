import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "src/components/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Navbar />
        <div className="container">
          <Component {...pageProps} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
