import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api", // Endre hvis backend kjører på en annen port
    headers: {
        "Content-Type": "application/json",
    },
});

// Legger til JWT-token i alle forespørsler hvis brukeren er logget inn
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;