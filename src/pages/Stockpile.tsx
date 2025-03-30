import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getStockpileItems, deleteStockpileItem, StockpileItem} from "@/api/stockpile";
import {Button} from "@/components/ui/button";
import {Drawer, DrawerTrigger} from "@/components/ui/drawer";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";
import StockpileDrawer from "@/components/StockpileDrawer.tsx";
import StockpileTable from "@/components/StockpileTable.tsx";


export default function Stockpile() {
    const [items, setItems] = useState<StockpileItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<StockpileItem | null>(null);
    const [itemToDelete, setItemToDelete] = useState<StockpileItem | null>(null);

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

    const handleAddNew = () => {
        setSelectedItem({
            id: 0,
            latestStocktaking: 0,
            name: "",
            requiredQuantity: 0,
            shops: []
        });
        setIsDrawerOpen(true);
    };

    const handleEdit = (item: StockpileItem) => {
        setSelectedItem({
            id: item.id,
            name: item.name,
            requiredQuantity: item.requiredQuantity,
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

                <StockpileDrawer
                    open={isDrawerOpen}
                    setOpen={setIsDrawerOpen}
                    setItems={setItems}
                    selectedItem={selectedItem}
                />
            </Drawer>
            {error && <p className="text-red-500">{error}</p>}
            <StockpileTable
                items={items}
                handleEdit={handleEdit}
                setItemToDelete={setItemToDelete}
                setIsDrawerOpen={setIsDrawerOpen}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            />

            <ConfirmDeleteDialog
                open={isDeleteDialogOpen}
                setOpen={setIsDeleteDialogOpen}
                onConfirm={handleDelete}
                itemName={itemToDelete?.name}
            />
        </div>
    );
}