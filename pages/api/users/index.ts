import { NextApiRequest, NextApiResponse } from "next";

import { Employee } from "../../../data/employee";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!Array.isArray(Employee)) throw new Error("Cannot find user data");
    res.status(200).json(Employee);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: (err as Error).message });
  }
}
