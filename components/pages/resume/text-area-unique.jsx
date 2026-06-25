'use client';

import { db } from '@/firebase/config';
import useResponse from '@/store/store';
import { Button, Textarea } from '@nextui-org/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

function TextAreaUnique({ pdfData, user, messageId }) {
  const [jobDesc, setJobDesc] = useState("");
  const { response, isGenerating, updateResponse, clearResponse } = useResponse();
  const [generatedText, setGeneratedText] = useState();
  const [streamData, setStreamData] = useState("");

  const onSend = async () => {
    updateResponse("");
    try {
      if (jobDesc?.length === 0) {
        toast.error("Please enter job description...");
        return;
      }

      const body = {
        pdfURL: pdfData?.pdfURL,
        jobDesc: jobDesc,
        user: user?.email,
        messageId: messageId,
      };

      await addDoc(collection(db, `${user?.email}/files/resume/${messageId}/chats`), {
        text: jobDesc,
        timestamp: serverTimestamp(),
        email: user?.email,
        name: user?.displayName,
        sender: true,
      });

      const res = await fetch("/api/resume-analyze", {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (res.status === 400) throw new Error("Please try again");
      if (!res.body) {
        toast.error("Please try again...");
        return;
      }

      const reader = res.body.getReader();
      let text = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          await addDoc(collection(db, `${user?.email}/files/resume/${messageId}/chats`), {
            text: text,
            timestamp: serverTimestamp(),
            email: "chatai@gmail.com",
            name: "Chat AI",
            sender: false,
          });
          clearResponse("");
          break;
        }

        const chunk = new TextDecoder().decode(value);
        text += chunk;
        updateResponse(chunk);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Textarea
        onChange={(e) => setJobDesc(e.target.value)}
        height={1000}
        variant="faded"
        placeholder="Enter job description"
        className="w-full h-full bottom-0"
      />
      <Button disabled={isGenerating} onClick={onSend} color='primary'>Analyse</Button>
    </>
  );
}

export default TextAreaUnique;
