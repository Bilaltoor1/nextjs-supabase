
'use client';
import { useEffect, useState } from "react";

function useDarkMode() {
    const [theme, setTheme] = useState(
        typeof window !== "undefined" ? localStorage.theme : "dark"
    );
    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        const root = window.document.documentElement;
        console.log(root);
        root.classList.remove(colorTheme);
        root.classList.add(theme);

        if (typeof window !== "undefined") {
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    return [colorTheme, setTheme];
}

export default useDarkMode;