import { useState, useEffect } from "react";
import UserMenu from "@/components/UserMenu";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };

        const handleAuthChange = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };

        // Lytter etter endringer i localStorage
        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("authChange", handleAuthChange);

        return () => {
            console.log("remove storage");
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("authChange", handleAuthChange);
        };
    }, []);

    return (
        <div className="flex justify-between items-center p-4 shadow-md bg-white">
            <h1 className="text-xl font-bold">Stockpile</h1>
            {isLoggedIn && <UserMenu />}
        </div>
    );
}