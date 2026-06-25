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
import { auth, db } from "@/firebase/config";
import { Skeleton } from "@nextui-org/react";
import { ChatBubbleIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { collection, query } from "firebase/firestore";
import { SidebarCloseIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import AddNewImage from "./add-new-image";
import Link from "next/link";
function MobileSidebar() {
    var _a;
    var _b = useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var onOpen = function () {
        setIsOpen(!isOpen);
    };
    var pathname = usePathname();
    useEffect(function () {
        setIsOpen(false);
    }, [pathname, setIsOpen]);
    var routes = pathname.split("/");
    var id = routes[routes.length - 1];
    var _c = useAuthState(auth), user = _c[0], userLoading = _c[1], userError = _c[2];
    var q = query(collection(db, "".concat(user === null || user === void 0 ? void 0 : user.email, "/files/image")));
    var _d = useCollection(q), data = _d[0], loading = _d[1], error = _d[2];
    var documents = (_a = data === null || data === void 0 ? void 0 : data.docs) === null || _a === void 0 ? void 0 : _a.map(function (doc) {
        return __assign({ id: doc.id }, doc.data());
    });
    return (<div className="lg:hidden flex  z-10 ">
      <div className="fixed z-50 top-2 left-3">
        <button onClick={onOpen}>
          {isOpen ? (<SidebarCloseIcon className="h-6 w-6 "/>) : (<HamburgerMenuIcon className="h-6 w-6 "/>)}
        </button>
      </div>
      <div className={" ".concat(isOpen ? "w-full" : "w-0", "  bg-white max-w-96 duration-100 absolute z-20  h-screen")}>
        {userLoading || loading ? (<>
            <div className="mt-10  flex flex-col overflow-y-hidden h-screen px-2">
              <div className={"".concat(isOpen ? "block" : "hidden")}>
                <AddNewImage user={user}/>
              </div>
              <div className=" overflow-y-auto  h-screen pr-2 my-4">
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
          </>) : (<>
            <div className="mt-10 px-2">
              <div className={"duration-100 ".concat(isOpen ? "block" : "hidden")}>
                <AddNewImage user={user}/>
              </div>
              <div className=" overflow-y-auto  h-[90vh]  my-4">
                {documents === null || documents === void 0 ? void 0 : documents.map(function (e) {
                var _a, _b;
                return (<>
                      <Link href={"/image/".concat(e.id)}>
                        <div className={"flex my-2 ".concat(e.id === id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 ", " px-2 py-2 rounded-sm items-center")}>
                          <ChatBubbleIcon className="mr-2"/>
                          <span>
                            {" "}
                            {((_a = e === null || e === void 0 ? void 0 : e.imageName) === null || _a === void 0 ? void 0 : _a.length) < 17
                        ? e === null || e === void 0 ? void 0 : e.imageName
                        : ((_b = e === null || e === void 0 ? void 0 : e.imageName) === null || _b === void 0 ? void 0 : _b.slice(0, 17)) + "..."}
                          </span>
                        </div>
                      </Link>
                    </>);
            })}
              </div>
            </div>
          </>)}
      </div>
    </div>);
}
export default MobileSidebar;
