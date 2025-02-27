import apiClient from "./apiClient";

export interface RegisterData {
    username: string;
    password: string;
}

export const registerUser = async (data: RegisterData) => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
};