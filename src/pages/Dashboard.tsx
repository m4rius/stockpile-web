import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStockpileItems, StockpileItem } from "@/api/stockpile";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { isAuthenticated } from "@/utils/auth.ts";

export default function Dashboard() {
    const navigate = useNavigate();
    const [items, setItems] = useState<StockpileItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        }
        const fetchItems = async () => {
            try {
                const data = await getStockpileItems();
                setItems(data);
            } catch (err) {
                console.log(err)
                setError("Kunne ikke hente data.");
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-6">Lageroversikt</h1>

            {error && <p className="text-red-500">{error}</p>}

            <Card className="w-full max-w-3xl">
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Varenavn</TableHead>
                                <TableHead>Ønsket Antall</TableHead>
                                <TableHead>Siste Opptelling</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.latestStocktaking}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}