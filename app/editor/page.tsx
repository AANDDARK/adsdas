'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/utils"

export default function Page() {
    const [title, setTitle] = useState(""); // State для заголовка
    const [page, setPage] = useState("");  // State для контенту сторінки
    const [loading, setLoading] = useState(false); // Стан для індикатора завантаження
    const router = useRouter(); // Ініціалізація роутера

    async function getNextId() {
        const { data, error } = await supabase
            .from('post')
            .select('id') 
            .order('id', { ascending: false })
            .limit(1);

        if (error) {
            console.error('Error fetching last post ID:', error.message);
            return 1; // Якщо є помилка, встановлюємо перше значення
        }

        return data && data.length > 0 ? data[0].id + 1 : 1; 
    }

    async function post() {
        if (!title || !page) {
            alert('Будь ласка, заповніть усі поля.');
            return;
        }

        setLoading(true); // Початок завантаження

        const id = await getNextId();

        const { data, error } = await supabase
            .from('post')
            .insert({ id: id, title: title, page: page });

        setLoading(false); 

        if (error) {
            console.error('Insert Error:', error.message);
            alert('Сталася помилка: ' + error.message);
        } else {
            alert('Пост створено успішно!');
            router.push('/');
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-xl p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Створити новий пост</h1>
                <Input 
                    placeholder="Заголовок" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="mb-4"
                />

                <Textarea 
                    placeholder="Контент" 
                    value={page} 
                    onChange={(e) => setPage(e.target.value)} 
                    className="mb-4 h-40"
                />

                <Button 
                    onClick={post} 
                    disabled={loading} 
                    className="w-full"
                >
                    {loading ? 'Збереження...' : 'Зберегти'}
                </Button>
            </div>
        </div>
    );
}
