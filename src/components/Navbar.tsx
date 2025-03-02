import { useState, useEffect } from "react";
import UserMenu from "@/components/UserMenu";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const handleAuthChange = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };

        // Lytter etter endringer i localStorage
        window.addEventListener("authChange", handleAuthChange);

        return () => {
            window.removeEventListener("authChange", handleAuthChange);
        };
    }, []);

    return (
        <div className="flex justify-between items-center p-4 shadow-md bg-white">
            <Link to="/" className="text-xl font-bold hover:text-blue-500 transition">
                Stockpile
            </Link>
            {isLoggedIn && <UserMenu />}
        </div>
    );
}