import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req) {
  try {
    const { code } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0,
      stream: true,
      messages: [
        {
          role: "system",
          content: "Use the following pieces of code and provide the plag free code in same programming language.",
        },
        {
          role: "user",
          content: `Use the following pieces of code and provide the plag free code in same programming language, no need to change any logic used in code just simply change the function and variable names that's it. 
          
---------------

          Given code:
          ${code}
          `,
        },
      ],
      max_tokens: 4096,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
