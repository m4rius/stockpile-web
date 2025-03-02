import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStockpileItems, addStockpileItem, StockpileItem } from "@/api/stockpile";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogTitle } from "@/components/ui/dialog";

export default function Stockpile() {
    const [items, setItems] = useState<StockpileItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [newItem, setNewItem] = useState({ name: "", requiredQuantity: "" });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getStockpileItems();
                setItems(data);
            } catch (err) {
                console.log(err);
                setError("Kunne ikke hente data.");
            }
        };

        fetchItems();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!newItem.name || !newItem.requiredQuantity) {
            alert("Vennligst fyll ut alle feltene.");
            return;
        }

        try {
            const createdItem = await addStockpileItem({
                name: newItem.name,
                requiredQuantity: parseInt(newItem.requiredQuantity, 10),
            });

            setItems([...items, createdItem]); // Oppdaterer tabellen med den nye varen
            setNewItem({ name: "", requiredQuantity: "" }); // Nullstiller skjemaet
            setIsDrawerOpen(false); // Lukker skuffen
        } catch (err) {
            console.log(err);
            alert("Kunne ikke legge til varen.");
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
                ← Beredskapslager
            </Link>

            <h1 className="text-3xl font-bold mb-6">Mitt lager</h1>

            {/* Knapp for å legge til ny vare */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerTrigger asChild>
                    <Button className="mb-4">Legg til ny vare</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="p-6">
                        <DialogTitle className="text-xl font-bold mb-4">Legg til vare</DialogTitle>
                        <Label>Produktnavn</Label>
                        <Input name="name" value={newItem.name} onChange={handleInputChange} placeholder="F.eks. Ris, Hermetikk" className="mb-4" />
                        <Label>Antall vi skal ha</Label>
                        <Input name="requiredQuantity" type="number" value={newItem.requiredQuantity} onChange={handleInputChange} placeholder="Antall" className="mb-4" />
                        <Button onClick={handleSubmit} className="w-full">Lagre</Button>
                    </div>
                </DrawerContent>
            </Drawer>

            {/* Varetabel */}
            {error && <p className="text-red-500">{error}</p>}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Produktnavn</TableHead>
                        <TableHead>Antall vi har</TableHead>
                        <TableHead>Antall vi skal ha</TableHead>
                        <TableHead>Mangel</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.latestStocktaking ?? 0}</TableCell>
                            <TableCell>{item.requiredQuantity}</TableCell>
                            <TableCell className={item.requiredQuantity - (item.latestStocktaking ?? 0) > 0 ? "text-red-500" : "text-green-500"}>
                                {item.requiredQuantity - (item.latestStocktaking ?? 0)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}