import {Button} from "@/components/ui/button.tsx";

export default function App() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-600">Stockpile Manager</h1>
            <p className="text-gray-700 mt-2">Tailwind CSS is working! 🎉</p>
            <Button>Click me</Button>
        </div>
    );
}