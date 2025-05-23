import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { logout } from "@/utils/auth";
import { UserIcon } from "lucide-react";

export default function UserMenu() {
    const [firstName, setFirstName] = useState<string | null>(null);

    useEffect(() => {
        const storedFirstName = localStorage.getItem("firstName");
        setFirstName(storedFirstName || "Bruker");
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5" />
                    <span>{firstName}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => (window.location.href = "/profile")}>Profil</DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="text-red-500">Logg ut</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}