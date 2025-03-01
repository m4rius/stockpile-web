import apiClient from "./apiClient";

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const registerUser = async (data: RegisterData) => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
};

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    firstName: string;
    lastName: string;
}

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
    const response = await apiClient.post("/auth/login", JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};
