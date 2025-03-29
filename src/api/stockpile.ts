import apiClient from "./apiClient";
import {EditableStockpileItem} from "@/types.ts";


export interface StockpileItem {
    id: number;
    name: string;
    requiredQuantity: number;
    latestStocktaking?: number;
    shops: string[];
}

export interface ShopInfo {
    id: number;
    name: string;
}

// Hent alle varer
export const getStockpileItems = async (): Promise<StockpileItem[]> => {
    try {
        const response = await apiClient.get("/stockpile");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Legg til ny vare
export const addStockpileItem = async (data: Omit<EditableStockpileItem, "id">): Promise<StockpileItem> => {
    try {
        console.log("addStockpileItem", data);
        const response = await apiClient.post("/stockpile", data );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Oppdater en vare
export const updateStockpileItem = async (data: EditableStockpileItem): Promise<StockpileItem> => {
    try {
        const response = await apiClient.put(`/stockpile/${data.id}`, {
            name: data.name,
            requiredQuantity: data.requiredQuantity,
            shops: data.shops,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Slett en vare
export const deleteStockpileItem = async (id: number): Promise<void> => {
    try {
        await apiClient.delete(`/stockpile/${id}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAvailableShops = async (): Promise<ShopInfo[]> => {
    try {
        const response = await apiClient.get("/shops");
        return response.data.shops;
    } catch (error) {
        console.error("Kunne ikke hente butikker:", error);
        return [];
    }
};