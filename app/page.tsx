'use client';
import { ArticleBox } from "@/components/article-box";
import { useAdminStore } from "@/context/admin";

import { supabase } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const [posts, setPosts] = useState<any[]>([]); // Initialize posts state
    const [loading, setLoading] = useState(true); // Initialize loading state
    const adminState = useAdminStore((state) => state.adminState);
    const router = useRouter();

    useEffect(() => {
        async function fetchPosts() {
            const { data, error } = await supabase
                .from('post')
                .select('*');

            if (error) {
                console.error('Error fetching posts:', error.message);
            } else {
                setPosts(data);
            }
            setLoading(false); 
        }

        fetchPosts();
    }, []); 

    if (loading) {
        return <p>Завантаження...</p>; 
    }
    console.log(adminState)
    return (
        <div>
            <div className=" flex space-x-24 ml-4">
                <h1 className="font-semibold text-xl">Усі статті</h1>
                {adminState ? (
                    <Button onClick={() => router.push('/editor')}>
                        Написати нову статтю
                    </Button>
                ) : (
                    <Button onClick={() => router.push('/singin')}>
                        Увійти
                    </Button>
                )}
                <Button onClick={() => router.push('/guide')}>Guide for teacher</Button>
            </div>
            {posts.map((post) => (
                <ArticleBox className="flex justify-between items-center mb-4 " key={post.id} id={post.id} title={post.title} />
            ))}
        </div>
    );
}
