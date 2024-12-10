'use client';

import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/context/admin"; // Імпорт стану із zustand
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const [inputName, setInputName] = useState("");
    const [inputPass, setInputPass] = useState("");
    const [errorAlert, setErrorAlert] = useState(false);
    const router = useRouter()
   
    const adminState = useAdminStore((state) => state.adminState);
    const setAdminState = useAdminStore((state) => state.setAdminState);

    const check = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Запобігає перезавантаженню сторінки
        if (inputName === "admin" && inputPass === "passwd123") {
            setAdminState(true); // Оновлення стану
            console.log("Admin State Updated: ", adminState);
        } else {
            setErrorAlert(true);
            setTimeout(() => {
                setErrorAlert(false);
            }, 4000);
        }
    };

    return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="shadow-xl bg-white p-6 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Увійти
        </h1>
        <form onSubmit={check} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Ім'я
                </label>
                <input
                    id="name"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Пароль
                </label>
                <input
                    id="password"
                    type="password"
                    value={inputPass}
                    onChange={(e) => setInputPass(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <Button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => router.push('/')}>
                Увійти
            </Button>
        </form>
        {errorAlert && (
            <div className="mt-4 bg-rose-800 text-white text-center py-2 rounded-lg">
                Неправильне ім'я або пароль
            </div>
        )}
    </div>
</div>

    );
}
