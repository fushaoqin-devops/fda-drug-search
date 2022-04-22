import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";
import ReactTooltip from "react-tooltip";

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
  const [suggestions, setSuggestions] = useState<Suggestion[][]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");
  const weightedProducts = new Map();
  const [showCloseMatch, setShowCloseMatch] = useState(false);
  const [closeMatch, setCloseMatch] = useState<EditDistanceMatch[]>([]);
  const [pageIdx, setPageIdx] = useState(1);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const filterSuggestion = () => {};

  const handleSearch = async () => {
    setCloseMatch([]);
    setSuggestions([]);
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
      var tokenProducts = token.products;
      if (tokenProducts.charAt(tokenProducts.length - 1) === ";") {
        tokenProducts = tokenProducts.substring(0, tokenProducts.length - 1);
      }
      const products: string[] = tokenProducts.split(";");
      const qtfidf =
        ((1 + Math.log10(1)) * Math.log10(VSM_SIZE * 1.0)) / products.length;
      qMagnitude += Math.pow(qtfidf, 2);

      for (const p of products) {
        if (p !== "") {
          const tokenMagnitude = token.magnitude;
          const productId = p.split(",")[0];
          if (!productId) continue;
          const productName = await fetch(`/api/product/${productId}`)
            .then((res) => res.json())
            .then((data) => data?.name);
          const tokenWeight = parseFloat(p.split(",")[1]);
          const score = (qtfidf * tokenWeight) / tokenMagnitude;
          if (weightedProducts.has(productId)) {
            const prevScore = weightedProducts.get(productId).score;
            if (productId === "21a4c1ce-6ed4-4a0e-90b9-e07ca8f3ec40") {
            }
            weightedProducts.set(productId, {
              name: productName,
              score: prevScore + score,
            });
          } else {
            weightedProducts.set(productId, {
              name: productName,
              score: score,
            });
          }
        }
      }
    }
    const suggestionList: Suggestion[] = [];
    if (weightedProducts.size == 0) {
      editDistance();
    }
    qMagnitude = Math.sqrt(qMagnitude);
    weightedProducts.forEach((value, key) => {
      suggestionList.push({
        id: key,
        name: value.name,
        score: value.score / qMagnitude,
      });
    });
    // If cosine similarity is the same, sort by length of name
    suggestionList.sort((a, b) => {
      if (a.score === b.score) {
        return a.name.length > b.name.length ? 1 : -1;
      } else {
        return a.score > b.score ? -1 : 1;
      }
    });

    const paginatedList = [];
    for (var i = 0; i < suggestionList.length; i += 10) {
      paginatedList.push(
        suggestionList.slice(i, Math.min(suggestionList.length, i + 10))
      );
    }

    setSuggestions(paginatedList);
  };

  const handlePagination = (idx: number) => {
    setPageIdx(idx);
  };

  const handlePageUp = () => {
    setPageIdx(pageIdx + 1);
  };

  const handlePageDown = () => {
    setPageIdx(pageIdx - 1);
  };

  const editDistance = async () => {
    const res = await fetch(`api/product/editDistance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qString: input }),
    }).then((res) => res.json());
    if (res && res.length > 0) {
      setShowCloseMatch(true);
      setCloseMatch(res);
    } else {
      toast.error("Could not find any result. Please try another input");
    }
  };

  return (
    <div className="flex-col items-center justify-center">
      <ReactTooltip />
      {showCloseMatch && closeMatch.length > 0 ? (
        <div className="m-auto w-1/3">
          <ul>
            Did you mean:
            {closeMatch.map((match, idx) => {
              return (
                <>
                  {idx > 0 ? "," : ""}
                  <Link key={idx} href={`/product/${match.id}`} passHref>
                    <div className="red inline-block cursor-pointer pl-2 text-red-500 underline decoration-transparent hover:decoration-inherit">
                      {match.name}
                    </div>
                  </Link>
                </>
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
            data-tip="Enter drug name below"
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
        <div className="m-auto mt-5 block w-1/2 rounded-lg bg-zinc-50 p-6 shadow-lg">
          <ul>
            {suggestions[pageIdx - 1].map((suggestion, idx) => {
              return (
                <Link key={idx} href={`/product/${suggestion.id}`} passHref>
                  <li
                    key={idx}
                    className="cursor-pointer rounded-md py-2 px-3 text-xs text-slate-900 underline decoration-transparent transition duration-300 ease-in-out hover:bg-indigo-100 hover:decoration-inherit"
                  >
                    {suggestion.name}
                  </li>
                </Link>
              );
            })}
          </ul>
          {suggestions.length > 1 ? (
            <div className="flex justify-center">
              <nav>
                <ul className="list-style-none flex">
                  <li>
                    <button
                      className="relative block cursor-pointer rounded-full border-0 bg-transparent py-1 px-3 text-gray-800 outline-none transition-all duration-300 hover:text-gray-800 focus:shadow-none disabled:cursor-default disabled:text-gray-100"
                      onClick={handlePageDown}
                      disabled={pageIdx == 1}
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                  {suggestions.map((list, id) => {
                    return (
                      <li key={id}>
                        <button
                          className={`relative block cursor-pointer rounded-full border-0 py-1 px-3 outline-none transition-all duration-300 focus:shadow-none ${
                            id + 1 === pageIdx
                              ? "bg-indigo-400 text-white hover:bg-indigo-500 hover:text-white"
                              : "bg-transparent text-gray-800 hover:bg-gray-200 hover:text-gray-800"
                          }`}
                          onClick={() => {
                            handlePagination(id + 1);
                          }}
                        >
                          {id + 1}
                        </button>
                      </li>
                    );
                  })}
                  <li>
                    <button
                      className="relative block cursor-pointer rounded-full border-0 bg-transparent py-1 px-3 text-gray-800 outline-none transition-all duration-300 hover:text-gray-800 focus:shadow-none disabled:cursor-default disabled:text-gray-100"
                      onClick={handlePageUp}
                      disabled={pageIdx >= suggestions.length}
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="flex h-[300px] items-center justify-center">
          <BeatLoader color={"#a5b4fc"} loading={loading} size={25} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
