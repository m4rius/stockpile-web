import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/api/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await registerUser({ firstName, lastName, email, password });
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
                    <label className="block text-gray-700">Fornavn</label>
                    <Input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Fornavn"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Etternavn</label>
                    <Input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Etternavn"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">E-post</label>
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
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Passord"
                        required
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full mt-4">
                    Registrer
                </Button>
            </form>
        </div>
    );
}

