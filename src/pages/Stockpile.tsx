import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStockpileItems, updateStockpileItem, deleteStockpileItem, StockpileItem, addStockpileItem } from "@/api/stockpile";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function Stockpile() {
    const [items, setItems] = useState<StockpileItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [newItem, setNewItem] = useState<{ id: number | null; name: string; requiredQuantity: string; shops: string[] }>({
        id: null,
        name: "",
        requiredQuantity: "",
        shops: []
    });
    const [itemToDelete, setItemToDelete] = useState<StockpileItem | null>(null);
    const [shopInput, setShopInput] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getStockpileItems();
                setItems(data);
            } catch (err) {
                console.error(err);
                setError("Kunne ikke hente data.");
            }
        };

        fetchItems();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleAddShop = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && shopInput.trim() !== "") {
            e.preventDefault();
            if (!newItem.shops.includes(shopInput.trim())) {
                setNewItem({ ...newItem, shops: [...newItem.shops, shopInput.trim()] });
            }
            setShopInput(""); // Tøm inputfeltet
        }
    };

    const handleRemoveShop = (shop: string) => {
        setNewItem({ ...newItem, shops: newItem.shops.filter((s) => s !== shop) });
    };

    const handleSubmit = async () => {
        if (!newItem.name || !newItem.requiredQuantity) {
            alert("Vennligst fyll ut alle feltene.");
            return;
        }

        try {
            if (newItem.id) {
                // Oppdater eksisterende vare
                const updatedItem = await updateStockpileItem({
                    id: newItem.id,
                    name: newItem.name,
                    requiredQuantity: parseInt(newItem.requiredQuantity, 10),
                    shops: newItem.shops,
                });
                setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
            } else {
                // Legg til ny vare
                const createdItem = await addStockpileItem({
                    name: newItem.name,
                    requiredQuantity: parseInt(newItem.requiredQuantity, 10),
                    shops: newItem.shops,
                });
                setItems([...items, createdItem]);
            }

            setNewItem({ id: null, name: "", requiredQuantity: "", shops: [] });
            setIsDrawerOpen(false);
        } catch (err) {
            console.error(err);
            alert("Kunne ikke lagre varen.");
        }
    };

    const handleAddNew = () => {
        setNewItem({ id: null, name: "", requiredQuantity: "", shops: [] }); // Nullstiller state
        setIsDrawerOpen(true);
    };

    const handleEdit = (item: StockpileItem) => {
        setNewItem({
            id: item.id,
            name: item.name,
            requiredQuantity: item.requiredQuantity.toString(),
            shops: item.shops || [],
        });
        setIsDrawerOpen(true);
    };

    const handleDelete = async () => {
        if (!itemToDelete) return;

        try {
            await deleteStockpileItem(itemToDelete.id);
            setItems(items.filter((item) => item.id !== itemToDelete.id));
            setIsDeleteDialogOpen(false);
        } catch (err) {
            console.log(err);
            alert("Kunne ikke slette varen.");
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
                    <Button onClick={handleAddNew} className="mb-4">Legg til ny vare</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="p-6">
                        <DialogTitle className="text-xl font-bold mb-4">{newItem.id ? "Rediger vare" : "Legg til vare"}</DialogTitle>
                        <DialogDescription className="mb-4">
                            Fyll inn informasjon om varen. Du kan legge til butikker ved å skrive og trykke Enter.
                        </DialogDescription>

                        <Label>Produktnavn</Label>
                        <Input name="name" value={newItem.name} onChange={handleInputChange} placeholder="F.eks. Ris, Hermetikk" className="mb-4" />

                        <Label>Antall vi skal ha</Label>
                        <Input name="requiredQuantity" type="number" value={newItem.requiredQuantity} onChange={handleInputChange} placeholder="Antall" className="mb-4" />

                        <Label>Butikker</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {newItem.shops.map((shop) => (
                                <Badge key={shop} className="flex items-center gap-2">
                                    {shop}
                                    <X className="h-4 w-4 cursor-pointer" onClick={() => handleRemoveShop(shop)} />
                                </Badge>
                            ))}
                        </div>
                        <Input
                            value={shopInput}
                            onChange={(e) => setShopInput(e.target.value)}
                            onKeyDown={handleAddShop}
                            placeholder="Skriv butikknavn og trykk Enter"
                        />

                        <Button onClick={handleSubmit} className="w-full mt-4">{newItem.id ? "Oppdater" : "Lagre"}</Button>
                    </div>
                </DrawerContent>
            </Drawer>

            {/* Varetabel */}
            {error && <p className="text-red-500">{error}</p>}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Produktnavn</TableHead>
                        <TableHead>Har</TableHead>
                        <TableHead>Skal ha</TableHead>
                        <TableHead>Mangler</TableHead>
                        <TableHead>Butikker</TableHead>
                        <TableHead></TableHead>
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
                            <TableCell>{item.shops?.join(", ") || "-"}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost"><MoreVertical /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleEdit(item)}>Rediger</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => { setItemToDelete(item); setIsDeleteDialogOpen(true); }} className="text-red-500">Slett</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Bekreftelsedialog for sletting */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Bekreft sletting</DialogTitle>
                        <DialogDescription>Er du sikker på at du vil slette "{itemToDelete?.name}"? Denne handlingen kan
                            ikke angres.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Avbryt</Button>
                        <Button variant="destructive" onClick={handleDelete}>Slett</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}