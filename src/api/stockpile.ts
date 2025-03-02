import apiClient from "./apiClient";

export interface StockpileItem {
    id: number;
    name: string;
    requiredQuantity: number;
    latestStocktaking?: number;
}

export const getStockpileItems = async (): Promise<StockpileItem[]> => {
    const response = await apiClient.get("/stockpile");
    return response.data;
};

export const addStockpileItem = async (data: { name: string; requiredQuantity: number }): Promise<StockpileItem> => {
    const response = await apiClient.post("/stockpile", {
        ...data,
        shops: []
    });
    return response.data;

};