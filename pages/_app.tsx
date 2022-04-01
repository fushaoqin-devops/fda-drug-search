import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

declare global {
  var mongoose: any;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="FDA, Drug, Affordable" />
        <meta name="author" content="ISTE 612 team 5" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ThemeProvider attribute="class" enableSystem={false}>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
