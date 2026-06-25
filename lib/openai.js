import OpenAI from "openai";
// console.log()
export var openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
