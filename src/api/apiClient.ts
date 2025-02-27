import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api", // Endre hvis backend kjører på en annen port
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;