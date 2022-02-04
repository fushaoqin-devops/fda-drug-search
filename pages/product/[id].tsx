import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import prisma from "../../db/prisma";

export default function Product({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>{product?.name}</div>;
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { id } = query;
  const product = await prisma.products.findUnique({
    where: {
      id: id as string,
    },
  });
  return {
    props: {
      product,
    },
  };
}
