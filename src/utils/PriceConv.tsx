// pages/api/githubUser.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function PriceConv(res: NextApiResponse) {
  const username = "sonawaneteju4";

  if (!username || typeof username !== "string") {
    res.status(400).json({ error: "Invalid username" });
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("Failed to fetch GitHub user");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch GitHub user" });
  }
  return { res };
}
