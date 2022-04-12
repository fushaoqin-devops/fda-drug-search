import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../db/db";
import Ingredient from "../../../../db/models/Ingredient";

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
    var productList = await Ingredient.find({ _id: { $in: id } }).select(
      "products"
    );
    if (productList.length > 1) {
      productList.sort((a, b) => {
        return a.products.length - b.products.length;
      });
      var intersection = productList[0].products.split(";");
      for (var i = 1; i < productList.length; i++) {
        const temp = productList[i].products.split(";");
        for (const p of intersection) {
          if (temp.indexOf(p) == -1) {
            intersection = intersection.filter((t: string) => t !== p);
          }
        }
      }
      productList = intersection;
    } else {
      productList = productList[0].products.split(";");
    }
    return res.status(200).json(JSON.stringify(productList));
  } catch (error) {
    res.status(400).json({});
  }
}
