import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
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

interface Params extends ParsedUrlQuery {
  id: string;
}

const API_URL = `${process.env.BASE_URL}/api`;

export default function Product({ p }: MyProps) {
  const [checked, setChecked] = useState([]);

  const handleChange = (id: string) => {
    // TODO: handle check boxes
  };
  return (
    <div>
      <div className="flex justify-center text-6xl">{p?.name}</div>
      <ul>
        {p?.reviews ? (
          p.reviews.map((value, idx) => {
            return (
              <li key={idx}>
                <div>Condition: {value.split("~")[0]}</div>
                <div>Review: {value.split("~")[1]}</div>
                <div>Rating: {value.split("~")[2]}</div>
                <div>Date: {value.split("~")[3]}</div>
                <div>Useful Count: {value.split("~")[4]}</div>
              </li>
            );
          })
        ) : (
          <></>
        )}
      </ul>
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
                  <span className="text-sm">{value.name}</span>
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<MyProps, Params> = async (
  context
) => {
  const { id } = context.params!;
  const product = await fetch(`${API_URL}/product/${id}`)
    .then((res) => res.json())
    .then((data) => data);
  const reviews = product.review?.split(";");
  const ingredients = product.ingredients.split(";");
  const queryString = ingredients.join("/");
  const ingredientList = await fetch(
    `${API_URL}/ingredient/${queryString}`
  ).then((res) => res.json());
  const p = {
    name: product.name,
    reviews: reviews[0] === "null" ? null : reviews,
    ingredients: ingredientList,
  } as Product;
  return {
    props: {
      p,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const pidList = await fetch(`${API_URL}/product`).then((res) => res.json());
  const paths = pidList.map((pid: string) => ({
    params: {
      id: pid,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
