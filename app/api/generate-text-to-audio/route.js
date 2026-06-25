import { NextResponse } from "next/server";
import { storage } from "@/firebase/config";
import { openai } from "@/lib/openai";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function POST(req) {
  try {
    const { text, email } = await req.json();
    console.log(text);

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    const fileName = new Date();
    const audioRef = ref(storage, `/files/audios/${email}-${fileName.toString()}.mp3`);

    await uploadBytes(audioRef, buffer);
    const downloadURL = await getDownloadURL(audioRef);

    console.log(downloadURL);
    return NextResponse.json({ src: downloadURL });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
