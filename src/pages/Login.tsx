import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/api/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await loginUser({ email, password });

            localStorage.setItem("token", response.token);
            localStorage.setItem("firstName", response.firstName); // Lagrer fornavn til senere bruk
            localStorage.setItem("lastName", response.lastName); // Lagrer etternavn
            window.dispatchEvent(new Event("authChange")); // 🔥 Oppdater UI
            navigate("/dashboard");
        } catch (err) {
            setError("Feil e-post eller passord.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Logg inn</h1>
            <form onSubmit={handleLogin} className="bg-white p-6 shadow-md rounded-lg w-96">
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="mb-4">
                    <label className="block text-gray-700">Brukernavn</label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-post"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Passord</label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Passord"
                        required />
                </div>

                <Button type="submit" className="w-full mt-4">Logg inn</Button>
            </form>
        </div>
    );
}