'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/utils";

export default function PostPage({ params }) {
    const [data, setData] = useState(null);  // Для зберігання даних поста
    const [error, setError] = useState(null); // Для обробки помилки
    const [loading, setLoading] = useState(true); // Для індикатора завантаження

    useEffect(() => {
        // Функція для отримання поста
        async function fetchPost() {
            const { id } = params; // Отримуємо id з параметрів

            const { data, error } = await supabase
                .from('post')
                .select('*')
                .eq('id', id)
                .single(); // Очікуємо один результат

            if (error) {
                setError(error.message);
            } else {
                setData(data);
            }
            setLoading(false); // Завершуємо завантаження
        }

        fetchPost();
    }, [params]); // Завантаження викликається при зміні params

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold text-gray-700">Завантаження...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Помилка</h1>
                <p className="text-gray-700">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{data?.title || "Title not available"}</h1>
            <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                    __html: data?.page || "Content not available",
                }}
            />
        </div>
    );
}
