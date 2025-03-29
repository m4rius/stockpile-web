import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreVertical} from "lucide-react";
import {StockpileItem} from "@/api/stockpile.ts";

interface StockpileTableProps {
    items: StockpileItem[];
    handleEdit: (item: StockpileItem) => void;
    setItemToDelete: (item: StockpileItem) => void;
    setIsDrawerOpen: (open: boolean) => void;
    setIsDeleteDialogOpen: (open: boolean) => void;
}

export default function StockpileTable({
                                           items,
                                           handleEdit,
                                           setItemToDelete,
                                           setIsDrawerOpen,
                                           setIsDeleteDialogOpen
                                       }: StockpileTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Produktnavn</TableHead>
                    <TableHead>Har</TableHead>
                    <TableHead>Skal ha</TableHead>
                    <TableHead>Mandler</TableHead>
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
                        <TableCell
                            className={item.requiredQuantity - (item.latestStocktaking ?? 0) > 0 ? "text-red-500" : "text-green-500"}>
                            {item.requiredQuantity - (item.latestStocktaking ?? 0)}
                        </TableCell>
                        <TableCell>{item.shops?.join(", ") || "Ingen"}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost"><MoreVertical/></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => {
                                        handleEdit(item);
                                        setIsDrawerOpen(true);
                                    }}>Rediger</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {
                                        setItemToDelete(item);
                                        setIsDeleteDialogOpen(true);
                                    }} className="text-red-500">Slett</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}