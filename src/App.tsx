import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import AppRoutes from "./routes";

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AppRoutes />
        </QueryClientProvider>
    );
};

export default App;