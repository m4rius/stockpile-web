import {useState} from "react";
import {DialogTitle, DialogDescription} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {addStockpileItem, updateStockpileItem, StockpileItem} from "@/api/stockpile.ts";
import ShopInput from "./ShopInput.tsx";
import {EditableStockpileItem} from "@/types.ts";
import {DrawerContent} from "@/components/ui/drawer";

interface StockpileDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    setItems: (items: (prev: StockpileItem[]) => (StockpileItem[])) => void;
    selectedItem: StockpileItem | null;
}

export default function StockpileDrawer({setOpen, setItems, selectedItem}: StockpileDrawerProps) {
    const [newItem, setNewItem] = useState<EditableStockpileItem>(selectedItem || {
        id: null,
        name: "",
        requiredQuantity: 0,
        shops: []
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem({...newItem, [e.target.name]: e.target.value});
    };

    const handleSubmit = async () => {
        try {
            const updated = newItem.id ? await updateStockpileItem(newItem) : await addStockpileItem(newItem);

            setItems((prev: StockpileItem[]) => {
                if (newItem.id) {
                    return prev.map((i) => (i.id === updated.id ? updated : i)); // Oppdater eksisterende vare
                } else {
                    return [...prev, updated]; // Legg til ny vare
                }
            });

            setOpen(false);
        } catch (err) {
            console.error("Kunne ikke lagre varen.", err);
        }
    };

    return (
        <DrawerContent>
            <div className="p-6">
                <DialogTitle
                    className="text-xl font-bold mb-2">{newItem.id ? "Rediger vare" : "Legg til vare"}</DialogTitle>
                <DialogDescription className="mb-4">Fyll inn informasjon om varen.</DialogDescription>
                <Label>Produktnavn</Label>
                <Input name="name" value={newItem.name} onChange={handleInputChange} placeholder="F.eks. Ris, Hermetikk"
                       className="mb-4"/>
                <Label>Antall vi skal ha</Label>
                <Input name="requiredQuantity" type="number" value={newItem.requiredQuantity}
                       onChange={handleInputChange} placeholder="Antall" className="mb-4"/>
                <ShopInput newItem={newItem} setNewItem={setNewItem}/>
                <Button onClick={handleSubmit} className="w-full mt-4">Lagre</Button>
            </div>
        </DrawerContent>
    );
}