import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/db";
import VSM from "../../../db/models/VSM";

interface MyRequest extends NextApiRequest {
  query: {
    token: string;
  };
}

export default async function handler(req: MyRequest, res: NextApiResponse) {
  const {
    query: { token },
  } = req;

  await dbConnect();

  try {
    const t = await VSM.findOne({ name: token });
    return res.status(200).json(JSON.stringify(t));
  } catch (error) {
    res.status(400).json({});
  }
}
