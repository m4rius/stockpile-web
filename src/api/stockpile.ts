import apiClient from "./apiClient";

export interface StockpileItem {
    id: number;
    name: string;
    quantity: number;
    latestStocktaking: number;
}

export const getStockpileItems = async (): Promise<StockpileItem[]> => {
    const response = await apiClient.get("/stockpile");
    return response.data;
};