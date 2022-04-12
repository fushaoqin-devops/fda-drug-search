import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useState } from "react";

interface Product {
  name: string;
  reviews: string[];
  ingredients: Ingredient[];
}

interface Ingredient {
  id: string;
  name: string;
}

interface MyProps {
  p: Product;
}

const API_URL = `${process.env.BASE_URL}/api`;

const FILLED =
  "M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z";
const EMPTY =
  "M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z";

export default function Product({ p }: MyProps) {
  const [collapseIdx, setCollapseIdx] = useState<boolean[]>(
    new Array(p.reviews?.length).fill(true)
  );

  const handleChange = (id: string) => {
    // TODO: handle check boxes
  };

  const formatDate = (dateString: string) => {
    dateString = dateString?.replaceAll("-", " ");
    const formattedDate = new Date(Date.parse(dateString));
    return formattedDate.toLocaleDateString("en-US");
  };

  const getFormattedReview = (review: string) => {
    if (review.length > 200) {
      review = review.substring(0, 200);
      review += "...";
    }
    return review;
  };

  const handleCollapse = (idx: number) => {
    var temp = [...collapseIdx];
    temp[idx] = !temp[idx];
    setCollapseIdx(temp);
  };
  return (
    <div className="flex flex-row">
      <div className="basis-3/4">
        <div className="flex justify-center text-6xl">{p?.name}</div>
        <ul className="m-auto flex w-1/2 flex-col">
          <div>Active Ingredients: </div>
          {p.ingredients?.map((value, idx) => {
            return (
              <li key={idx} className="flex w-1/2">
                <div className="mb-2 flex">
                  <label className="flex items-center font-bold text-gray-500">
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      onChange={() => {
                        handleChange(value.id);
                      }}
                    />
                    <span className="text-sm">
                      {value.name.replace(/(^\w{1})|(\s+\w{1})/g, (c) =>
                        c.toUpperCase()
                      )}
                    </span>
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mr-6 basis-1/4 overflow-auto">
        {p?.reviews ? (
          p.reviews.map((value, idx) => {
            return (
              <div key={idx}>
                <div className="m-3 flex justify-center font-mono text-lg">
                  {" "}
                  Condition: {value.split("~")[0]?.replaceAll('"', "")}
                </div>
                <div className="m-3 block rounded-lg bg-white p-6 shadow-lg">
                  <ul className="mb-2 flex">
                    <li>
                      <svg
                        focusable="false"
                        data-icon="star"
                        className="mr-1 w-4 text-yellow-500"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d={parseInt(value.split("~")[2]) > 1 ? FILLED : EMPTY}
                        ></path>
                      </svg>
                    </li>
                    <li>
                      <svg
                        focusable="false"
                        data-icon="star"
                        className="mr-1 w-4 text-yellow-500"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d={parseInt(value.split("~")[2]) > 3 ? FILLED : EMPTY}
                        ></path>
                      </svg>
                    </li>
                    <li>
                      <svg
                        focusable="false"
                        data-icon="star"
                        className="mr-1 w-4 text-yellow-500"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d={parseInt(value.split("~")[2]) > 5 ? FILLED : EMPTY}
                        ></path>
                      </svg>
                    </li>
                    <li>
                      <svg
                        focusable="false"
                        data-icon="star"
                        className="mr-1 w-4 text-yellow-500"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d={parseInt(value.split("~")[2]) > 7 ? FILLED : EMPTY}
                        ></path>
                      </svg>
                    </li>
                    <li>
                      <svg
                        focusable="false"
                        data-icon="star"
                        className="w-4 text-yellow-500"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d={parseInt(value.split("~")[2]) > 9 ? FILLED : EMPTY}
                        ></path>
                      </svg>
                    </li>
                  </ul>
                  <div className="mb-2 text-sm text-gray-400">
                    Reviewed on {formatDate(value.split("~")[3])}
                  </div>
                  <div className="overflow-hidden text-ellipsis text-sm italic text-gray-500">
                    <Image
                      src="/left-quote.svg"
                      width="15px"
                      height="15px"
                      alt=""
                    ></Image>{" "}
                    <span className="">
                      {collapseIdx[idx] === true
                        ? getFormattedReview(value.split("~")[1])
                        : value.split("~")[1]}
                    </span>
                    <Image
                      src="/right-quote.svg"
                      width="15px"
                      height="15px"
                      alt=""
                    ></Image>
                  </div>
                  {value.split("~")[1].length > 200 ? (
                    <div
                      className="flex cursor-pointer text-sm text-gray-400"
                      onClick={() => handleCollapse(idx)}
                    >
                      <Image
                        src={collapseIdx[idx] ? "/down.svg" : "/up.svg"}
                        width="15px"
                        height="15px"
                        alt=""
                      ></Image>
                      <span className="m-2">
                        {collapseIdx[idx] ? "Show more" : "Show less"}
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="flex justify-end">
                    <Image
                      src="/thumb-up.svg"
                      width="25px"
                      height="25px"
                      alt=""
                    ></Image>
                    {value.split("~")[4]?.replaceAll('"', "")}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { id } = query;
  const product = await fetch(`${API_URL}/product/${id}`)
    .then((res) => res.json())
    .then((data) => data);
  const reviews = product.review?.split(";");
  const ingredients = product.ingredients.split(";");
  const ingredientList = [];
  for (const ingredientID of ingredients) {
    if (ingredientID !== "") {
      const ingredient = await fetch(
        `${API_URL}/ingredient/${ingredientID}`
      ).then((res) => res.json());
      ingredientList.push({ id: ingredientID, name: ingredient.name });
    }
  }
  const p = {
    name: product.name,
    reviews: reviews[0] === "null" ? null : reviews,
    ingredients: ingredientList,
  };
  return {
    props: {
      p,
    },
  };
}
