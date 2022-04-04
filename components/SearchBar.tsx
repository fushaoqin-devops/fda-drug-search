import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const VSM_SIZE = 5693;

interface VSMToken {
  _id: string;
  name: string;
  magnitude: number;
  products: string;
}

interface Suggestion {
  id: string;
  name: string;
  score: number;
}

interface EditDistanceMatch {
  id: string;
  name: string;
  dist: number;
}

const SearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");
  const weightedProducts = new Map();
  const [showCloseMatch, setShowCloseMatch] = useState(false);
  const [closeMatch, setCloseMatch] = useState<EditDistanceMatch[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const filterSuggestion = () => {};

  const handleSearch = async () => {
    setLoading(true);
    await rankSearch();
    setLoading(false);
    setShowSuggestions(true);
  };

  const rankSearch = async () => {
    const query: string[] = input.toLowerCase().split(" ");
    let qMagnitude: number = 0;

    for (const q of query) {
      const token: VSMToken = await fetch(`/api/vsm/${q}`)
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
      if (!token) continue;
      const products: string[] = token.products.split(";");
      const qtfidf =
        ((1 + Math.log10(1)) * Math.log10(VSM_SIZE * 1.0)) / products.length;
      qMagnitude += Math.pow(qtfidf, 2);

      for (const p of products) {
        const tokenMagnitude = token.magnitude;
        const productId = p.split(",")[0];
        if (!productId) continue;
        const productName = await fetch(`/api/product/${productId}`)
          .then((res) => res.json())
          .then((data) => data?.name);
        const tokenWeight = parseFloat(p.split(",")[1]);
        const score = (qtfidf * tokenWeight) / tokenMagnitude;
        if (weightedProducts.has(productId)) {
          weightedProducts.set(productId, {
            name: productName,
            score: weightedProducts.get(productId) + score,
          });
        } else {
          weightedProducts.set(productId, { name: productName, score: score });
        }
      }
    }
    const suggestionList: Suggestion[] = [];
    if (weightedProducts.size == 0) {
      editDistance();
    }
    qMagnitude = Math.sqrt(qMagnitude);
    weightedProducts.forEach((value, key) => {
      suggestionList.push({ id: key, name: value.name, score: value.score });
    });

    setSuggestions(suggestionList);
  };

  const editDistance = async () => {
    console.log(input);
    const res = await fetch(`api/product/editDistance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qString: input }),
    }).then((res) => res.json());
    if (res) {
      setShowCloseMatch(true);
      setCloseMatch(res);
    }
  };

  return (
    <div className="flex-col items-center justify-center">
      {showCloseMatch && closeMatch.length > 0 ? (
        <div className="mb-50 m-auto w-1/3">
          <ul>
            Did you mean:
            {closeMatch.map((match, idx) => {
              return (
                <Link key={idx} href={`/product/${match.id}`} passHref>
                  <div className="red inline-block cursor-pointer pl-2 text-red-500 underline">
                    {idx > 0 ? "," : ""} {match.name}
                  </div>
                </Link>
              );
            })}
            ?
          </ul>
        </div>
      ) : (
        <></>
      )}
      <div className="m-auto w-1/3">
        <div className="input-group relative flex flex-wrap items-stretch">
          <input
            className="form-control relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-gray-300 bg-zinc-50 bg-clip-padding px-3 text-base font-normal text-gray-700 transition ease-in-out focus:border-purple-200 focus:bg-white focus:text-gray-700 focus:outline-none"
            placeholder="Search"
            aria-label="Search"
            onChange={onChange}
            onKeyUp={filterSuggestion}
            value={input}
          ></input>
          <button
            className="btn-search btn inline-block flex items-center rounded bg-indigo-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out  hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg disabled:opacity-50 dark:bg-indigo-300"
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
      </div>
      {showSuggestions && suggestions.length > 0 ? (
        <div className="mb-50 m-auto w-1/3">
          <ul>
            {suggestions.map((suggestion, idx) => {
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
        </div>
      ) : (
        <div className="flex h-[300px] items-center justify-center">
          <BeatLoader color={"#a5b4fc"} loading={loading} size={50} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
