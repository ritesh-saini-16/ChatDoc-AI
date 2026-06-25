import { GoogleGenerativeAI } from "@google/generative-ai";
var geminiAPI = process.env.GEMINI_API_KEY;
var genAI = new GoogleGenerativeAI(geminiAPI);
var model = genAI.getGenerativeModel({ model: "gemini-pro" });
export default model;
