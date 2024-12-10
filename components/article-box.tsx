'use client'
import { useRouter } from "next/navigation"
import { Button } from "./ui/button";

export function ArticleBox(props: any) {
    const router = useRouter();
    
    return (
        <>
<div className="flex space-x-5 border-4 p-4 w-fit ml-4 p-10 rounded-lg my-4">
    <h1 className="text-xl font-semibold">{props.title}</h1>
    <Button className="bg-blue-600" onClick={() => router.push(`/article/${props.id}`)}>Go</Button>
</div>

        </>
    );
}
