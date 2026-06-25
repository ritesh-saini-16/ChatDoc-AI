import axios from "axios";
import { NextResponse } from "next/server";

async function pdfURLToBase64(pdfURL) {
  try {
    const response = await axios.get(pdfURL, {
      responseType: "arraybuffer",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      },
    });

    if (response.status === 200) {
      const base64Data = Buffer.from(response.data, "binary").toString("base64");
      return base64Data;
    } else {
      throw new Error(`Failed to fetch image (${response.status} ${response.statusText})`);
    }
  } catch (error) {
    console.error("Error fetching PDF:", error);
    return null;
  }
}

export async function POST(request) {
  try {
    const { pdfURL } = await request.json();
    const base64 = await pdfURLToBase64(pdfURL);
    return NextResponse.json({ base64 }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ err: "Internal server error" }, { status: 500 });
  }
}
