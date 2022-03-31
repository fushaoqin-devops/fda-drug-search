import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/db";
import Product from "../../../db/models/Product";

interface MyRequest extends NextApiRequest {
  query: {
    id: string;
  };
}

export default async function handler(req: MyRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  await dbConnect();

  try {
    const p = await Product.findById(id);
    return res.status(200).json(JSON.stringify(p));
  } catch (error) {
    res.status(400).json({});
  }
}
