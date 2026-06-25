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
import useResponse from '@/store/store';
import { collection, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
function AnalyzeResume(_a) {
    var _b;
    var id = _a.id, user = _a.user;
    var q = query(collection(db, "".concat(user === null || user === void 0 ? void 0 : user.email, "/files/resume/").concat(id, "/chats")), orderBy("timestamp"));
    var _c = useCollection(q), _snapshot = _c[0], chatLoading = _c[1], chatError = _c[2];
    var chatData = (_b = _snapshot === null || _snapshot === void 0 ? void 0 : _snapshot.docs) === null || _b === void 0 ? void 0 : _b.map(function (doc) { return (__assign({ id: doc.id }, doc.data())); });
    var messagesEndRef = useRef(null);
    useEffect(function () {
        var _a;
        (_a = messagesEndRef === null || messagesEndRef === void 0 ? void 0 : messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
            behaviour: "smooth",
            block: "end",
        });
    }, [chatData]);
    var _d = useResponse(), response = _d.response, updateResponse = _d.updateResponse, clearResponse = _d.clearResponse;
    if ((chatData === null || chatData === void 0 ? void 0 : chatData.length) == 0) {
        return <div className='h-screen flex justify-center items-center flex-col'>
         <p>Provide job description and get the result. </p>
    </div>;
    }
    return (<>
      {chatData === null || chatData === void 0 ? void 0 : chatData.map(function (e, index) {
            if (index % 2)
                return <div key={index + 1} className='border bg-gray-100 h-auto rounded-lg px-2 py-2'>
            <Markdown className="text-sm" remarkPlugins={[remarkGfm]}>
              {e.text}
            </Markdown>
          </div>;
        })}
      {response.length ? <>
        <div className='border bg-gray-100 h-auto rounded-lg px-2 py-2'>
          <Markdown className="text-sm" remarkPlugins={[remarkGfm]}>
            {response}
          </Markdown>
        </div>
      </> : <></>}
      <div ref={messagesEndRef}></div>
    </>);
}
export default AnalyzeResume;
