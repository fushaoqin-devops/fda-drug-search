import { products } from "@prisma/client";
import type { GetStaticProps, NextPage } from "next";
import { useTheme } from "next-themes";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import prisma from "../db/prisma";

export interface Products {
  productList: products[];
}

export const getStaticProps: GetStaticProps = async () => {
  const productList = await prisma.products.findMany();
  return { props: { productList } };
};

const Home: NextPage<Products> = (props: Products) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  // Switch theme
  const handleTheme = () => {
    const oppositeTheme = theme === "dark" ? "light" : "dark";
    setTheme(oppositeTheme);
  };

  // Avoid hydration Mismatch
  if (!mounted) return null;

  return (
    <div className="h-screen bg-gray-200 dark:bg-slate-900">
      <Head>
        <title>Home - FDA Drug Alternative</title>
        <meta name="description" content="FDA drug search engine" />
      </Head>
      <div className="flex w-full justify-end">
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="order-2 h-12 w-12 items-end p-3 md:order-3"
          onClick={handleTheme}
        >
          <Image
            src={theme === "dark" ? "/moon.svg" : "/sun.svg"}
            width="100%"
            height="100%"
            alt="theme icon"
            className="theme-icon"
          ></Image>
        </button>
      </div>
      <h1 className="py-24 text-center text-6xl font-bold tracking-tight text-slate-900 dark:text-gray-200">
        Affordable FDA Drug Alternative
      </h1>
      <SearchBar productList={props.productList} />
    </div>
  );
};

export default Home;
