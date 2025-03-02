import apiClient from "./apiClient";

export interface StockpileItem {
    id: number;
    name: string;
    requiredQuantity: number;
    latestStocktaking?: number;
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
export const addStockpileItem = async (data: { name: string; requiredQuantity: number }): Promise<StockpileItem> => {
    try {
        const response = await apiClient.post("/stockpile", {
            ...data,
            shops: [], // Legger til en tom liste for butikker
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Oppdater en vare
export const updateStockpileItem = async (data: { id: number; name: string; requiredQuantity: number }): Promise<StockpileItem> => {
    try {
        const response = await apiClient.put(`/stockpile/${data.id}`, {
            name: data.name,
            requiredQuantity: data.requiredQuantity,
            shops: [], // Beholder tom liste for butikker foreløpig
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