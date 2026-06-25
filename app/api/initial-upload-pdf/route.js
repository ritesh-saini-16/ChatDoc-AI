import { NextResponse } from "next/server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { openai } from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req) {
  try {
    const { pdfURL, pageNo } = await req.json();

    const pdfResponse = await fetch(pdfURL);
    const blob = await pdfResponse.blob();
    const loader = new PDFLoader(blob);
    const pageLevelDocs = await loader.load();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0,
      stream: true,
      messages: [
        {
          role: "system",
          content: "Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.",
        },
        {
          role: "user",
          content: `User the following context and summarize this context and create 3 question related to this and please don't add summary word in response.
          
---------------

          CONTEXT:
          ${pageLevelDocs[pageNo - 1].pageContent}
          `,
        },
      ],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
