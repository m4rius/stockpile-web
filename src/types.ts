export type EditableStockpileItem = {
    id: number | null;
    name: string;
    requiredQuantity: number;
    shops: string[];
};