import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../db/prisma";

interface MyRequest extends NextApiRequest {
  query: {
    token: string;
  };
}

export default async function handler(req: MyRequest, res: NextApiResponse) {
  const {
    query: { token },
  } = req;

  const t = await prisma.vsm.findFirst({ where: { name: "ten" } });
  res.json({
    token: token,
  });
}
