import { NextResponse } from "next/server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import { openai } from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req) {
  try {
    const body = await req.json();
    const { pdfURL, message, pageNo, user, messageId } = body;

    const pdfResponse = await fetch(pdfURL);
    const blob = await pdfResponse.blob();
    const loader = new PDFLoader(blob);
    const pageLevelDocs = await loader.load();
    
    console.dir(pageLevelDocs);
    const pagesAmt = pageLevelDocs.length;

    const messageRef = collection(db, `${user?.email}/files/pdf/${messageId}/chats`);
    const q = query(messageRef, orderBy("timestamp", "desc"), limit(5));
    const querySnapshot = await getDocs(q);

    const prevMessages = [];
    querySnapshot.forEach((doc) => {
      prevMessages.push({ id: doc.id, ...doc.data() });
    });

    const formattedPrevMessages = prevMessages.map((msg) => ({
      role: msg.sender ? "user" : "assistant",
      content: msg.text,
    }));

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
          content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. 
if you can provide relavent answer please provide

          
--------------


          PREVIOUS CONVERSATION:
          ${formattedPrevMessages.map((message) => {
            if (message.role === "user") return `User: ${message.content}\n`;
            return `Assistant: ${message.content}`;
          })}

          
---------------

          CONTEXT:
          ${pageLevelDocs[pageNo - 1].pageContent}

          
---------------

          USER INPUT: ${message}
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
