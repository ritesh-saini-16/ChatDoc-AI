"use client";
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
import { Skeleton } from "@nextui-org/react";
import React from "react";
import AddNewImage from "./add-new-image";
import Link from "next/link";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { collection, query } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { usePathname, useRouter } from "next/navigation";
function Sidebar() {
    var router = useRouter();
    var pathname = usePathname();
    var routes = pathname.split("/");
    var id = routes[routes.length - 1];
    var user = useAuthState(auth)[0];
    var q = query(collection(db, "".concat(user === null || user === void 0 ? void 0 : user.email, "/files/pdf")));
    var _a = useCollection(q), data = _a[0], loading = _a[1], error = _a[2];
    if (loading) {
        return (<>
        <div className="w-full px-2 py-2">
          <AddNewImage user={user}/>
          <div className=" overflow-y-auto  h-[90vh] pr-2 my-4">
            {Array(10)
                .fill(0)
                .map(function (e) {
                return (<>
                    <div className="flex my-2  bg-gray-100 px-2 py-2 rounded-sm items-center">
                      <Skeleton className="rounded-lg">
                        <div className="h-8 rounded-lg bg-default-300"></div>
                      </Skeleton>
                    </div>
                  </>);
            })}
          </div>
        </div>
      </>);
    }
    if (error) {
        return <>Error</>;
    }
    var documents = data.docs.map(function (doc) {
        return __assign({ id: doc.id }, doc.data());
    });
    return (<>
      <div className="w-full  flex flex-col h-screen  px-2 ">
        <AddNewImage documents={documents} user={user}/>
        <div className=" overflow-y-auto  h-screen pr-2 my-4">
          {documents === null || documents === void 0 ? void 0 : documents.map(function (e) {
            var _a, _b;
            return (<>
                <Link href={"/pdf/".concat(e.id)}>
                  <div className={"flex my-2 ".concat(e.id === id ? "bg-[#ececec] " : " ", " px-2 py-1  hover:bg-[#ececec]  text-black  rounded-lg items-center")}>
                    <ChatBubbleIcon className="mr-2"/>
                    <span>
                      {" "}
                      {((_a = e === null || e === void 0 ? void 0 : e.pdfName) === null || _a === void 0 ? void 0 : _a.length) < 17
                    ? e === null || e === void 0 ? void 0 : e.pdfName
                    : ((_b = e === null || e === void 0 ? void 0 : e.pdfName) === null || _b === void 0 ? void 0 : _b.slice(0, 17)) + "..."}
                    </span>
                  </div>
                </Link>
              </>);
        })}
        </div>
      </div>
    </>);
}
export default Sidebar;
