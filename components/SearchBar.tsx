import { products } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export interface Products {
  productList: products[];
}

const SearchBar = ({ productList }: Products) => {
  const [suggestions, setSuggestions] = useState<products[]>([]);
  const [input, setInput] = useState("");
  const [matchCount, setMatchCount] = useState(new Map());
  const [exactMatch, setExactMatch] = useState("");
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // TODO: Do some research on search optimization and improve the current algorithm
  const filterSuggestion = () => {
    const filtered = input === "" ? [] : productList.filter(fuzzSearch);
    filtered.sort(sortBySimilarity);

    setSuggestions(filtered.slice(0, 10));
    setMatchCount(new Map());
  };

  // Update idx of matched characters of each product name
  const fuzzSearch = (product: products) => {
    const name = product.name.trim().toLowerCase();
    const currInput = input.trim().toLowerCase();
    if (name === currInput) {
      setExactMatch(product.id);
    }
    // loop through each character and keep a map between each name and array of matched indexes
    for (var i = 0; i < input.length; i++) {
      const c = currInput.charAt(i);
      const idx = name.indexOf(c);
      if (idx === -1) continue;
      if (!matchCount.get(name)) {
        setMatchCount(matchCount.set(name, [idx]));
      } else {
        const idxArray = matchCount.get(name);
        if (!idxArray.includes(idx)) {
          idxArray.push(idx);
          setMatchCount(matchCount.set(name, idxArray));
        }
      }
    }
    return matchCount.get(name)?.length > 0 ? true : false;
  };

  // Sort product names based on number of matched characters
  const sortBySimilarity = (a: products, b: products) => {
    const numMatchedA = matchCount.get(a.name.trim().toLowerCase()).length;
    const numMatchedB = matchCount.get(b.name.trim().toLowerCase()).length;
    // In case of same number of matched characters, name with higher percentage of match is ranked higher
    if (numMatchedA === numMatchedB) {
      return (
        a.name.trim().toLowerCase().length - b.name.trim().toLowerCase().length
      );
    }
    return numMatchedB - numMatchedA;
  };

  const handleSearch = () => {
    if (exactMatch !== "") {
      router.push(`/product/${exactMatch}`);
    } else if (suggestions.length !== 0) {
      router.push(`/product/${suggestions[0].id}`);
    } else {
      router.push(`/product/404`);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="mb-3 xl:w-96">
        <div className="input-group relative flex flex-wrap items-stretch w-full">
          <input
            className="form-control relative flex-auto min-w-0 block w-full px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-100 focus:outline-none"
            placeholder="Search"
            aria-label="Search"
            onChange={onChange}
            onKeyUp={filterSuggestion}
            value={input}
          ></input>
          <button
            className="btn btn-search disabled:opacity-50 inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
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
        {suggestions?.length ? (
          <ul className="shadow-md bg-white rounded max-h-40 overflow-y-auto overflow-x-hidden w-80">
            {suggestions?.map((suggestion, idx) => {
              return (
                <Link key={idx} href={`/product/${suggestion.id}`} passHref>
                  <li
                    key={idx}
                    className="hover:bg-blue-50 py-2 px-3 text-slate-900 cursor-pointer text-xs"
                  >
                    {suggestion.name}
                  </li>
                </Link>
              );
            })}
          </ul>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
