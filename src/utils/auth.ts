export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem("token");
};

export const logout = () => {
    localStorage.removeItem("token"); // Fjern JWT-token
    localStorage.removeItem("username");
    window.dispatchEvent(new Event("authChange")); // 🔥 Oppdater UI
    window.location.href = "/login"; // Send brukeren til login-siden
};