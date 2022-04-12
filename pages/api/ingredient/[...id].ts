import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/db";
import Ingredient from "../../../db/models/Ingredient";

interface MyRequest extends NextApiRequest {
  query: {
    id: string[];
  };
}

export default async function handler(req: MyRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  await dbConnect();

  try {
    const ingredientList = await Ingredient.find({ _id: { $in: id } }).select(
      "_id name"
    );
    return res.status(200).json(JSON.stringify(ingredientList));
  } catch (error) {
    res.status(400).json({});
  }
}
