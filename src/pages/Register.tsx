import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/api/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await registerUser({ username, password });
            alert("Bruker registrert! 🎉");
            navigate("/login"); // Send brukeren til login etter registrering
        } catch (err) {
            console.log(err)
            setError("Kunne ikke registrere bruker. Prøv igjen.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Registrer ny bruker</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg w-96">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700">Brukernavn</label>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Velg et brukernavn"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Passord</label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Velg et sterkt passord"
                        required
                    />
                </div>
                <Button type="submit" className="w-full">Registrer</Button>
            </form>
        </div>
    );
}