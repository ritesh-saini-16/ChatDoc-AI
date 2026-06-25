import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

// Access your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function imageUrlToBase64(imageUrl) {
  try {
    const response = await axios.get(imageUrl, {
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
    console.log("Error:", error?.message || error);
    return null;
  }
}

function fileToGenerativePart(base64, mimeType) {
  return {
    inlineData: {
      data: base64,
      mimeType: mimeType,
    },
  };
}

async function imageUrlToBlob(imageUrl) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      },
    });

    if (!response || !response.data) {
      throw new Error("Failed to fetch image");
    }

    return new Blob([response.data], { type: "image/jpeg" });
  } catch (error) {
    throw error;
  }
}

async function imageToTextGenerate(imageUrl) {
  const base64 = await imageUrlToBase64(imageUrl);
  return base64;
}

export default imageToTextGenerate;
