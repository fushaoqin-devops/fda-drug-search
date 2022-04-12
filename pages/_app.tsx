import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import "../styles/globals.css";
import "../styles/nprogress.css";

declare global {
  var mongoose: any;
}

NProgress.configure({ showSpinner: false, easing: "ease" });

function MyApp({ Component, pageProps }: AppProps) {
  const [pageLoading, setPageLoading] = useState(false);
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
    setPageLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
    setPageLoading(false);
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
    setPageLoading(false);
  });
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="FDA, Drug, Affordable" />
        <meta name="author" content="ISTE 612 team 5" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ThemeProvider attribute="class" enableSystem={false}>
        <div>
          <Toaster />
        </div>
        {pageLoading ? (
          <div className="flex h-screen items-center justify-center bg-gray-200 dark:bg-slate-900">
            <div className="flex flex-col">
              <RingLoader color={"#a5b4fc"} size={150} />
              <span className="mx-auto my-8 animate-ping-slow font-mono tracking-widest text-slate-500 dark:text-gray-200">
                Loading...
              </span>
            </div>
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
