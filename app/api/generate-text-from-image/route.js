import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function GET(request) {
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

export async function POST(request) {
  try {
    const { imageURL, prompt } = await request.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      temperature: 0,
      stream: true,
      messages: [
        {
          role: "system",
          content: "Please provide the answer to the users question in markdown format.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `\n            USER Question: ${prompt}\n            `,
            },
            {
              type: "image_url",
              image_url: {
                url: imageURL,
              },
            },
          ],
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
