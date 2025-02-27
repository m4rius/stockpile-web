import {Button} from "@/components/ui/button.tsx";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-600">Stockpile Manager</h1>

            <Button>Click me</Button>
        </div>

    );
};

export default Home;