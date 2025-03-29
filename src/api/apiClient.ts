import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/api`;

const apiClient = axios.create({
    baseURL: `${baseUrl}`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Legger til JWT-token i alle forespørsler hvis brukeren er logget inn
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Håndterer feil, fjerner token hvis det er ugyldig
apiClient.interceptors.response.use(
    (response) => response, // Hvis responsen er OK, returner den
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.warn("Ugyldig token, logger ut...");
            localStorage.removeItem("token"); // Fjern token
            window.location.href = "/login"; // Send brukeren til login
        }
        return Promise.reject(error);
    }
);

export default apiClient;