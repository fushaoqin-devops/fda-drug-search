import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/db";
import Product from "../../../db/models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    const pidList = await Product.find({}).distinct("_id");
    return res.status(200).json(JSON.stringify(pidList));
  } catch (error) {
    res.status(400).json({});
  }
}
