import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import AppRoutes from "./routes";
import Navbar from "@/components/Navbar.tsx";

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <AppRoutes />
                </main>
            </div>
        </QueryClientProvider>
    );
};

export default App;