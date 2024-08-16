import ollama from "ollama";
import { NextApiRequest, NextApiResponse } from "next";

type RequestBody = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  const body: RequestBody = req.body;

  const response = await ollama.chat({
    model: process.env.OLLAMA_MODEL ?? "llama3",
    messages: [{ role: "user", content: body.message }],
    stream: true,
  });

  for await (const part of response) {
    res.write(part.message.content);
  }

  res.end();
}
