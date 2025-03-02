import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import Navbar from "@/components/Navbar.tsx";

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <AppRoutes />
                </main>
            </div>
        </Router>
    );
};

export default App;