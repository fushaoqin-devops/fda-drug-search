import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const VSM_SIZE = 5693;

const SearchBar = () => {
  // const [suggestions, setSuggestions] = useState<products[]>([]);
  const [input, setInput] = useState("");
  const router = useRouter();
  const weightedProducts = new Map();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const filterSuggestion = () => {};

  const handleSearch = async () => {
    // await rankSearch();
  };

  // const rankSearch = async () => {
  //   const query: string[] = input.toLowerCase().split(" ");
  //   let qMagnitude: number = 0;

  //   for (const q of query) {
  //     const token = await prisma.vsm.findUnique({
  //       where: { name: q },
  //     });
  //     if (!token) continue;
  //     const products: string[] = token.products.split(";");
  //     const qtfidf =
  //       ((1 + Math.log10(1)) * Math.log10(VSM_SIZE * 1.0)) / products.length;
  //     qMagnitude += Math.pow(qtfidf, 2);

  //     for (const p of products) {
  //       const tokenMagnitude = parseFloat(token.normalize + "");
  //       const productId = uuidParse(p.split(",")[0]);
  //       const tokenWeight = parseFloat(p.split(",")[1]);
  //       const score = (qtfidf * tokenWeight) / tokenMagnitude;
  //       if (weightedProducts.has(productId)) {
  //         weightedProducts.set(
  //           productId,
  //           weightedProducts.get(productId) + score
  //         );
  //       } else {
  //         weightedProducts.set(productId, score);
  //       }
  //     }
  //   }
  //   qMagnitude = Math.sqrt(qMagnitude);
  //   console.log(weightedProducts);
  // };

  return (
    <div className="flex justify-center">
      <div className="mb-3 xl:w-96">
        <div className="input-group relative flex w-full flex-wrap items-stretch">
          <input
            className="form-control relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-100 focus:bg-white focus:text-gray-700 focus:outline-none"
            placeholder="Search"
            aria-label="Search"
            onChange={onChange}
            onKeyUp={filterSuggestion}
            value={input}
          ></input>
          <button
            className="btn-search btn inline-block flex items-center rounded bg-blue-400 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150  ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg disabled:opacity-50"
            type="button"
            onClick={handleSearch}
            disabled={!input}
          >
            <Image
              aria-hidden="true"
              data-prefix="fas"
              data-icon="search"
              className="w-4"
              src="/search.svg"
              width="15px"
              height="15px"
              alt="search icon"
            ></Image>
          </button>
        </div>
        {/* {suggestions?.length ? (
          <ul className="max-h-40 w-80 overflow-y-auto overflow-x-hidden rounded bg-white shadow-md">
            {suggestions?.map((suggestion, idx) => {
              return (
                <Link key={idx} href={`/product/${suggestion.id}`} passHref>
                  <li
                    key={idx}
                    className="cursor-pointer py-2 px-3 text-xs text-slate-900 hover:bg-blue-50"
                  >
                    {suggestion.name}
                  </li>
                </Link>
              );
            })}
          </ul>
        ) : (
          <div></div>
        )} */}
      </div>
    </div>
  );
};

export default SearchBar;
