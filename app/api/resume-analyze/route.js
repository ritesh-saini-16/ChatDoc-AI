import { NextResponse } from "next/server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { openai } from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);
    const { pdfURL, user, messageId, jobDesc } = body;

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
          content: `Please provide a complete analysis of the resume in relation to the given job description. Identify which requirements are fulfilled and which are not in two different section for detailed information. Additionally, offer suggestions to improve the resume based on the job description, and finally, showcase the total score out of 100 and also provide what keyword this resume need to for better ATS score. If a job description is not provided, please simply respond with "Please provide a job description."
          
---------------

          JOB DESCRIPTION: ${jobDesc}
          
---------------

          RESUME:
          ${pageLevelDocs[0].pageContent}
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
