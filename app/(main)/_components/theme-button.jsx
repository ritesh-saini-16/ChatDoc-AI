import React, { useEffect, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, } from "@nextui-org/react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
function ThemeButton() {
    var _a = useState(false), mounted = _a[0], setMounted = _a[1];
    var _b = useState("light"), sysmtemTheme = _b[0], setSystemTheme = _b[1];
    var _c = useTheme(), theme = _c.theme, setTheme = _c.setTheme;
    useEffect(function () {
        var tempTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        setSystemTheme(tempTheme);
        setMounted(true);
    }, [setMounted, setSystemTheme]);
    console.log(theme);
    if (!mounted)
        return null;
    return (<div className="flex justify-between">
      <span>Theme</span>
      <Dropdown>
        <DropdownTrigger>
          <button className={" px-3 outline-none py-2 rounded-lg flex space-x-2 ".concat(theme === "light" ? "hover:bg-[#ececec]  text-black" : "hover:bg-[#2f2f2f] text-white", "  ")}>
            {(theme === null || theme === void 0 ? void 0 : theme.slice(0, 1).toUpperCase()) + (theme === null || theme === void 0 ? void 0 : theme.slice(1))}
            <span className="">
              <ChevronDown />
            </span>
          </button>
        </DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
          <DropdownItem onClick={function () {
            setTheme(sysmtemTheme);
        }} key="system">System</DropdownItem>
          <DropdownItem onClick={function () {
            setTheme('dark');
        }} key="dark">Dark</DropdownItem>
          <DropdownItem onClick={function () {
            setTheme('light');
        }} key="light">Light</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>);
}
export default ThemeButton;
