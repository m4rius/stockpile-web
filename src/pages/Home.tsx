import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const handleAuthChange = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };

        window.addEventListener("authChange", handleAuthChange);

        return () => {
            window.removeEventListener("authChange", handleAuthChange);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {!isLoggedIn ? (
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Velkommen til Stockpile</h1>
                    <p className="text-lg text-gray-700 mb-6">Registrer deg for å komme i gang</p>
                    <Link to="/register">
                        <Button className="text-lg px-6 py-3">Registrer deg</Button>
                    </Link>
                    <p className="mt-4 text-gray-700">
                        Har du allerede en konto?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Logg inn
                        </Link>
                    </p>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-6">
                    <h1 className="text-3xl font-bold mb-4">Hva vil du gjøre?</h1>
                    <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
                        <Link to="/stockpile" className="w-full">
                            <Button className="text-xl px-8 py-4 w-full">📦 Lagerbeholdning</Button>
                        </Link>
                        <Link to="/shoppinglist" className="w-full">
                            <Button className="text-xl px-8 py-4 w-full">🛒 Handleliste</Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}