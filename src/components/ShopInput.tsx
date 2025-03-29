import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { X } from "lucide-react";
import {getAvailableShops, ShopInfo} from "@/api/stockpile.ts";
import { Dispatch, SetStateAction } from "react";
import {EditableStockpileItem} from "@/types.ts";

interface ShopInputProps {
    newItem: EditableStockpileItem;
    setNewItem: Dispatch<SetStateAction<EditableStockpileItem>>;
}

export default function ShopInput({ newItem, setNewItem }: ShopInputProps) {
    const [shopInput, setShopInput] = useState("");
    const [shopSuggestions, setShopSuggestions] = useState<ShopInfo[]>([]);
    const [allShops, setAllShops] = useState<ShopInfo[]>([]);

    useEffect(() => {
        const fetchShops = async () => {
            console.log("Fetching shops");
            const shops = await getAvailableShops();
            console.log("Shops done")
            console.log(shops);
            setAllShops(shops );
        };
        fetchShops();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShopInput(e.target.value);
        if (e.target.value.length > 0) {
            console.log("handleInputChange", e.target.value);
            console.log(e.target.value);
            console.log(allShops);
            const filteredShops = allShops.filter((shop) =>
                shop.name.toLowerCase().startsWith(e.target.value.toLowerCase())
            );
            setShopSuggestions(filteredShops);
        } else {
            setShopSuggestions([]);
        }
    };

    const handleAddShop = (shop: string) => {
        if (!newItem.shops.includes(shop.trim())) {
            setNewItem({ ...newItem, shops: [...newItem.shops, shop.trim()] });
        }
        setShopInput("");
        setShopSuggestions([]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && shopInput.trim() !== "") {
            e.preventDefault();
            handleAddShop(shopInput);
        }
    };

    const handleRemoveShop = (shop: string) => {
        setNewItem({ ...newItem, shops: newItem.shops.filter((s) => s !== shop) });
    };

    return (
        <div>
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
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Skriv butikknavn og trykk Enter"
            />

            {/* Vis autocomplete forslag */}
            {shopSuggestions.length > 0 && (
                <div className="bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto shadow-md">
                    {shopSuggestions.map((shop) => (
                        <div key={shop.name} onClick={() => handleAddShop(shop.name)} className="p-2 hover:bg-gray-100 cursor-pointer">
                            {shop.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}