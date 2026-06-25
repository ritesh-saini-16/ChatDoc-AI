import { useEdgeStore } from "@/components/providers/edgestore-provider";
import { db } from "@/firebase/config";
import { Button, Progress } from "@nextui-org/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
function UploadFromComputer(_a) {
    var user = _a.user, onClose = _a.onClose;
    var _b = useState(), file = _b[0], setFile = _b[1];
    var _c = useState(false), isUploading = _c[0], setInUploading = _c[1];
    var _d = useState(0), progress = _d[0], setProgress = _d[1];
    var router = useRouter();
    var edgestore = useEdgeStore().edgestore;
    var onUploading = function () {
        if (!file) {
            toast.error("Please select a file!!");
            return;
        }
        if (!user) {
            toast.error("Please login...");
            router.push("/");
        }
        var newPromise = new Promise(function (resolve, reject) {
            try {
                edgestore.publicFiles
                    .upload({
                    file: file,
                    onProgressChange: function (progress) {
                        setProgress(progress);
                    },
                })
                    .then(function (res) {
                    var postData = {
                        imageName: file.name,
                        username: user.displayName,
                        email: user.email,
                        phoneNo: user.phoneNumber,
                        imageURL: res.url,
                        createdDate: serverTimestamp(),
                        idPublished: false,
                    };
                    var ref = collection(db, "".concat(user.email, "/files/image"));
                    addDoc(ref, postData).then(function (res) {
                        router.push("/image/".concat(res.id));
                        onClose();
                        resolve(res.id);
                    });
                });
            }
            catch (error) {
                reject("Failed upload...");
            }
        });
        toast.promise(newPromise, {
            success: "File uploaded successfully!",
            error: "Upload failed...",
            loading: "File uploading",
        });
    };
    return (<div className="">
      <div className="my-4 ">
        <div className="mb-1">
          {isUploading ? (<Progress size="sm" aria-label="Loading..." value={progress}/>) : (<></>)}
        </div>
        <input onChange={function (e) {
            setFile(e.target.files[0]);
        }} className="w-full py-1 px-2 bg-gray-200 shadow-sm border rounded-sm" id="file_input" type="file" accept="image/*" data-max-size="1024"/>
        <span className="text-sm mt-1 text-gray-600">Max 1 MB file</span>
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="flat" color="danger">
          Cancel
        </Button>
        <Button disabled={isUploading} onClick={onUploading} variant="flat" color="primary">
          Upload
        </Button>
      </div>
    </div>);
}
export default UploadFromComputer;
