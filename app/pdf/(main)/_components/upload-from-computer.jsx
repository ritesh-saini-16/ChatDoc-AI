'use client';

import { useEdgeStore } from "@/components/providers/edgestore-provider";
import { db } from "@/firebase/config";
import { Button, Progress } from "@nextui-org/react";
import axios from "axios";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function UploadFromComputer({ user, onClose }) {
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const onUploading = () => {
    if (!file) {
      toast.error("Please select a file!!");
      return;
    }
    if (!user) {
      toast.error("Please login...");
      router.push("/");
      return;
    }
    if (file.size > 2000000) {
      toast.error("Max file size 2 MB");
      return;
    }

    setIsUploading(true);
    const newPromise = new Promise(async (resolve, reject) => {
      try {
        console.log("Uploading file to EdgeStore...");
        const res = await edgestore.publicFiles.upload({
          file: file,
          onProgressChange: (progress) => {
            console.log("Upload progress:", progress);
            setProgress(progress);
          },
        });
        console.log("EdgeStore upload complete:", res);

        const postData = {
          pdfName: file.name,
          username: user.displayName,
          email: user.email,
          phoneNo: user.phoneNumber,
          pdfURL: res.url,
          createdDate: serverTimestamp(),
          idPublished: false,
        };

        console.log("Saving to Firestore...");
        const refDoc = collection(db, `${user.email}/files/pdf`);
        const response = await addDoc(refDoc, postData);
        console.log("Firestore save complete:", response.id);

        const bodyData = {
          pdfURL: res.url,
          pageNo: 1,
        };

        console.log("Calling initial upload API...");
        const { data } = await axios.post("/api/initial-upload-pdf", bodyData);
        console.log("Initial API response:", data);

        await addDoc(collection(db, `${user?.email}/files/pdf/${response.id}/chats`), {
          text: data,
          timestamp: serverTimestamp(),
          email: "chatai@gmail.com",
          name: "Chat AI",
          sender: false,
        });
        console.log("Added initial chat to Firestore");

        onClose();
        setIsUploading(false);
        router.push(`/pdf/${response.id}`);
        resolve(response.id);
      } catch (error) {
        console.error("Upload failed:", error);
        setIsUploading(false);
        reject(`Upload failed: ${error.message}`);
      }
    });

    toast.promise(newPromise, {
      success: "File uploaded successfully!",
      error: (err) => err || "Upload failed...",
      loading: "File uploading",
    });
  };

  return (
    <div className="">
      <div className="my-4 ">
        <div className="mb-1">
          {isUploading ? (
            <Progress size="sm" aria-label="Loading..." value={progress} />
          ) : (
            <></>
          )}
        </div>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full py-1 px-2 bg-gray-200 shadow-sm border rounded-sm"
          id="file_input"
          type="file"
          accept="application/pdf"
        />
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="flat" color="danger" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={isUploading}
          onClick={onUploading}
          variant="flat"
          color="primary"
        >
          Upload
        </Button>
      </div>
    </div>
  );
}

export default UploadFromComputer;