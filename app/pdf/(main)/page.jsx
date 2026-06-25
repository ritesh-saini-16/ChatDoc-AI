"use client";

import { File, Loader2Icon } from "lucide-react";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

function Page() {
  const { theme } = useTheme();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col w-full justify-center items-center">
        <Loader2Icon className="h-6 w-6 animate-spin" />
        <span>Loading page...</span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={`flex h-screen ${theme === "light" ? "bg-white text-black" : "bg-[#2c2c2c] text-white"} flex-col items-center w-full justify-center px-4`}>
      <File className="h-6 w-6" />
      <p className="mt-2 text-center">Please select a pdf file.</p>
    </div>
  );
}

export default Page;
