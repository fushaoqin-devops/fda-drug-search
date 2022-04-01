import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../db/db";
import Product from "../../../../db/models/Product";

export const config = {
  api: {
    bodyParse: {
      sizeLimit: "4mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { qString } = req.body;
  await dbConnect();

  try {
    var pList = await Product.find({ name: { $regex: qString } }).select(
      "_id name"
    );
    var i = 0;
    for (const p of pList) {
      const pName = p.name;
      const editDistance = calcEditDistance(pName, qString);
      pList[i] = { id: p._id, name: pName, dist: editDistance };
      i++;
    }
    pList.sort((a, b) => (a.dist > b.dist ? 1 : -1));
    res.status(200).json(JSON.stringify(pList.slice(0, 3)));
  } catch (error) {
    res.status(400).json(JSON.stringify(error.message));
  }
}

function calcEditDistance(pName: string, qString: string) {
  const x = pName.length;
  const y = qString.length;

  if (x == 0 || y == 0) {
    return x + y;
  }

  const dp = Array(x + 1)
    .fill(null)
    .map(() => Array(y + 1).fill(null));

  for (var i = 0; i < x + 1; i++) {
    dp[i][0] = i;
  }

  for (var j = 0; j < y + 1; j++) {
    dp[0][j] = j;
  }

  for (var i = 1; i < x + 1; i++) {
    for (var j = 1; j < y + 1; j++) {
      const add = dp[i - 1][j] + 1;
      const del = dp[i][j - 1] + 1;
      var rep = dp[i - 1][j - 1];
      if (pName.charAt(i - 1) != qString.charAt(j - 1)) {
        rep += 1;
      }
      dp[i][j] = Math.min(add, del, rep);
    }
  }

  return dp[x][y];
}
