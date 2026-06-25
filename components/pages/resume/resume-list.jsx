var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { db } from '@/firebase/config';
import { collection, query } from 'firebase/firestore';
import Link from 'next/link';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import DrapAndDrop from './drag-and-drop';
import ShowResume from './show-resume';
// import { Document, Page } from "react-pdf";
// import { pdfjs } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";
// // import { useResizeDetector } from "react-resize-detector";
// import toast from 'react-hot-toast';
// import { Loader2 } from 'lucide-react';
// import SimpleBar from 'simplebar-react';
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
function ResumeList(_a) {
    var id = _a.id, user = _a.user;
    // alert(id);
    // console.log(user);
    var q = query(collection(db, "".concat(user === null || user === void 0 ? void 0 : user.email, "/files/resume")));
    // const { width, ref } = useResizeDetector();
    var _b = useCollection(q), data = _b[0], loading = _b[1], error = _b[2];
    if (loading) {
        return <p>Loading</p>;
    }
    if (error) {
        return <p>Please try again</p>;
    }
    var documents = data.docs.map(function (doc) {
        return __assign({ id: doc.id }, doc.data());
    });
    // console.log(documents);
    // console.log(documents);
    return (<>
      {documents === null || documents === void 0 ? void 0 : documents.map(function (e) {
            return <Link key={e.id} href={"/resume/".concat(e === null || e === void 0 ? void 0 : e.id)}>
          <ShowResume url={e.pdfURL} resumeId={e.id} id={id}/>
        </Link>;
        })}


      <DrapAndDrop user={user}/>
    </>);
}
export default ResumeList;
