"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
export var ThemeSwitcher = function () {
    var _a = useState(false), mounted = _a[0], setMounted = _a[1];
    var _b = useTheme(), theme = _b.theme, setTheme = _b.setTheme;
    useEffect(function () {
        setMounted(true);
    }, [setMounted]);
    if (!mounted) {
        return null;
    }
    return (<button className={"w-fit absolute right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 bg-slate-200 dark:bg-[#212933]"} onClick={function () { return setTheme(theme === "dark" ? "light" : "dark"); }}>
      {theme === "light" ? "Dark" : "Light"}
    </button>);
};
